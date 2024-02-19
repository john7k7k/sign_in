const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => {
    if(!req.body.newSection.match('^' + req.admin.section) && req.admin.section !== '001'){
        res.sendStatus(403);
        return;
    }
    await prisma.user.update({
        data: {
            section: req.body.newSection
        },
        where: {
            username: req.body.username
        }
    })

    const { level, section, userID, fishAble } = await prisma.user.findUnique({
        where: {
            username: req.body.username
        },
        include: {
            fishAble: true
        }
    })

    if(level > 10) return res.sendStatus(200);
    
    const fishesUID  = (await prisma.fish.findMany())
    .filter(({ location }) => location.match('^' + section) || section === '001')
    .filter(({ fishUID }) => !fishAble.map(({ fishUID }) => fishUID).includes(fishUID))
    .map(({ fishUID }) => fishUID)
    
    await prisma.fishAble.createMany({
        data: fishesUID.map(fishUID => ({ fishUID, userID }))
    })

    res.sendStatus(200);

}