const { PrismaClient } = require('@prisma/client');
const md5 = require('blueimp-md5');
const prisma = new PrismaClient();

module.exports = async function(req, res) {
    console.log(req.body)
    if (req.body.code === global.randCode) {
        await prisma.user.update({
            where: {
                username: req.body.username
            },
            data: {
                passcode: md5(global.password)
            }
        })
        res.sendStatus(200);
        console.log("重設密碼成功");
        randCode = `${(Math.floor(Math.random()*1000000))}`;
        return;
    }
    res.sendStatus(403);
    console.log("重設密碼失敗，驗證碼錯誤")
}