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
    res.sendStatus(200);
}