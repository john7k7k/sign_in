const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => {
    const { location } = req.query;
    if(!location) return res.send([]);
    const fish = await getNonFaultyFishInPond(location);
    //console.log(JSON.stringify(fish));
    res.send(fish);
}

async function getNonFaultyFishInPond(location) {
    // 获取所有属于特定 pondId 的鱼
    const fishInPond = await prisma.fish.findMany({
      where: {
        location,
        exist: 1
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
    const nonFaultyFish = fishInPond.filter(fish => fish.fishData[0] && fish.fishData[0].active==1);
    console.log(global.controlling)
    return nonFaultyFish.map(({ fishUID, nickName }) => ({ fishUID, nickName, controlled:  global.controlling.includes(fishUID)?global.fishCount[fishUID]:false}));
  }
  