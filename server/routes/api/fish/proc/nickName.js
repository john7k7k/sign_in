const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

const setNickName = async (req, res) => {
    try{
        const { fishUID, nickName } = req.body;
        const { location } = await prisma.fish.findUnique({
            where: { fishUID }
        })
        const otherNickNames = (await prisma.fish.findMany({
            where: { location }
        })).map(({ nickName }) => nickName)
        for(let otherNickName of otherNickNames){
            if(otherNickName === nickName) return res.status(403).send('同一水池暱稱重複');
        }
        await prisma.fish.update({
            where: { fishUID },
            data: { nickName }
        })
        res.send(200)
    }catch(e){ console.log(e);res.sendStatus(500);}
}

module.exports = { setNickName }