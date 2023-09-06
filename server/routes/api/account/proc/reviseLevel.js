const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => { 
    await prisma.user.update({
        where: {username: req.body.username},
        data: {level: req.body.newLevel}
    });

    if(req.body.newLevel > 10) return res.sendStatus(200);

    const { section , userID } = await prisma.user.findUnique({
        where: { username: req.body.username}
    })

    const fishesUID  = (await prisma.fish.findMany())
    .filter(({ location }) => location.match('^' + section) || section === '001')
    .map(({ fishUID }) => fishUID)
    
    await prisma.fishAble.createMany({
        data: fishesUID.map(fishUID => ({ fishUID, userID }))
    })

    res.sendStatus(200);
}