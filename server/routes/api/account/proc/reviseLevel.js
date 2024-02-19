const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => { 
    await prisma.user.update({
        where: {username: req.body.username},
        data: {level: req.body.newLevel}
    });

    if(req.body.newLevel > 10) return res.sendStatus(200);

    const { section , userID, fishAble } = await prisma.user.findUnique({
        where: { username: req.body.username},
        include: {
            fishAble: true
        }
    })
    const fishesUID  = (await prisma.fish.findMany())
    .filter(({ location }) => location.match('^' + section) || section === '001')
    .filter(({ fishUID }) => !fishAble.map(({ fishUID }) => fishUID).includes(fishUID))
    .map(({ fishUID }) => fishUID)
    
    for (let  fishUID  of fishesUID)
        await prisma.fishAble.create({
          data: {
            user: {
              connect: {
                userID
              }
            },
            fish: {
              connect:{
                fishUID
              }
            }
          }
        });

    res.sendStatus(200);
}