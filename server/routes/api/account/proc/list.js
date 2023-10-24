const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => { 
    let resData = await prisma.user.findMany({
        include: {
            fishAble: true
        }
    });
    if(req.query.section !== '001')
        resData = resData.filter(user => user.section.match('^' + req.query.section));
    for(let userData of resData){
        delete userData.passcode;
    }
    res.send(resData);
}