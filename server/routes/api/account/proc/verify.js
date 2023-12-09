const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => {
    try{
        const { username } = req.query;
        console.log(username);
        await prisma.user.update({
        data: {
            verify: 1
        },
        where: {
            username
        }
        })
        res.redirect('login');
    }catch{ res.sendStatus(403) }
}