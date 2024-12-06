module.exports = async function getUseTime(req, res){
    const { times } = req.query;
    if(!times) res.send(1217);
    // const data = (await prisma.pool.findUnique({
    //     where: {
    //         id: poolID
    //     }
    // })).mac
    //console.log(data)
    else res.send(times);
}