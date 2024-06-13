const { prisma } =  require('../../../../modules/util/myPrisma.js') ;
const path = require('path');
const fs = require('fs')

module.exports = async (req, res) => {
    const { location } = req.body;

    const fish = await getNonFaultyFishInPond(location, res);
}

async function getNonFaultyFishInPond(location, res) {
    // 获取所有属于特定 pondId 的鱼
    const fishInPond = await prisma.fish.findMany({
      where: {
        location
      },
      include: {
        fishData: {
          orderBy: {
            time: 'desc'
          },
          take: 1
        }
      }
    });
    console.log(fishInPond)
    if(!fishInPond[0]||!fishInPond[0].fishData[0]) return res.send([]);
    const nonFaultyFish = fishInPond.filter(fish => fish.fishData[0] && fish.fishData[0].active==1);
    if(!nonFaultyFish[0]) return res.send([]);
    fishPhotoName = {};
    nonFaultyFish.forEach(({ fishUID }) => {
        const dir = path.join(__dirname, `../../../../uploads/photos/fish/${fishUID}`);
        console.log(dir)
        fs.readdir(dir , (err, photos) => {
            if(photos) fishPhotoName[fishUID] = photos.at(-1)?path.join(dir, photos.at(-1)):'no image';
            console.log(nonFaultyFish)
            if(fishUID === nonFaultyFish.at(-1).fishUID) return res.send(fishPhotoName);
        })
    })
  }
  