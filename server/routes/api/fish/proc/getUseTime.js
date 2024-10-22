module.exports = async function getUseTime(req, res){
    const poolID = req.query.poolID
    const data = (await prisma.pool.findUnique({
        where: {
            id: poolID
        }
    })).mac
    console.log(data)
    res.send(data)
}