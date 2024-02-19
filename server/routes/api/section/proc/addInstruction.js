const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => {
    try{
    const { instruction } = req.body;
    await prisma.instruction.create({
        data: {
        id: instruction.code,
        name: instruction.name
        }
    })
    res.sendStatus(200);
    }catch{ res.sendStatus(403) }
}