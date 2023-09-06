const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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

    const { level, location, userID } = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    if(level > 10) return res.sendStatus(200);
    
    
}