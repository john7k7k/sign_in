const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

module.exports = async (req, res) => {
    const type = req.body.type;
    const id = req.body.data.id;
    prisma.component.create({
        data : {
            id: id
        }
    })
    res.send(id);
}

