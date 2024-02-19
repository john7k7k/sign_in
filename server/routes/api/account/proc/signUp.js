const md5 = require('blueimp-md5');
const transporter = require('../../../../modules/util/nodeMailer')();
const { prisma } =  require('../../../../modules/util/myPrisma.js') ;
const dotenv = require("dotenv").config();
const fs = require('fs');

module.exports = async function(req, res) {
    try{
        const { username, mail, password, section} = req.body;
        if(! (username && mail && password && section)) return res.sendStatus(403);
        if(! (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(mail))) return res.status(403).send('電子郵件不合法');
        const userTable = await prisma.user.findMany();
        for (let user of userTable) {
            if (req.body.username === user.username) {
            res.status(403).send('帳號已存在')
            return;
            }
        }
        await prisma.user.create({
            data:{
                username: req.body.username,
                email: req.body.mail,
                passcode: md5(req.body.password),
                registrationTime: Math.floor((new Date()).getTime()/1000),
                level: req.body.level,
                section: req.body.section,
                exist: 1,
                verify: 0,
                fishAble: {
                create: []
                }
            }
        })
        fs.mkdir(`uploads/photos/user/${req.body.username}/sticker`, {recursive: true},() => void 0);
        const mailOption = {
        from: process.env.DB_GMAIL_ACCOUNT,
        to: req.body.mail,
        subject: "aifish.cc 註冊帳號驗證",
        text: `您的帳號'${req.body.username}'需要驗證，請點擊下方連結驗證
        https://${process.env.DOMAIN}/api/v1/account/verify/?username=${req.body.username}`
        }
        transporter.sendMail(mailOption, (error, info) => {
        if (error) console.log(error);
        else console.log("sent" + info.response)
        })
        res.sendStatus(200); //註冊成功
    }catch(err){res.sendStatus(500); console.log(err);}
}