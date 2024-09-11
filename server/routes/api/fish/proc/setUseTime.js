module.exports = async function getUseTime(req, res){
    const poolID = req.query.poolID
     (await prisma.pool.update({
        where: {
            id: poolID
        },
        data:{
            mac: req.body.times
        }
    }))
    res.sendStatus(200)
}