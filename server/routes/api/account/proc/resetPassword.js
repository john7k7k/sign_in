const transporter = require('../../../../modules/util/nodeMailer')();
const { prisma } =  require('../../../../modules/util/myPrisma.js') ;
const dotenv = require("dotenv").config();

module.exports = async function(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username
        }
    })
    if(! user){
        res.sendStatus(403);
        console.log("重設密碼失敗，查無此帳號")
    }
    if (req.body.mail !== user.email) {
        res.sendStatus(403);//重設密碼失敗，電子郵件錯誤
        console.log("重設密碼失敗，電子郵件錯誤")
        return;
    }
    global.randCode = `${(Math.floor(Math.random()*1000000))}`;
    console.log(global.randCode)
    global.password = req.body.password;
    const mailOption = {
    from: process.env.DB_GMAIL_ACCOUNT,
    to: req.body.mail,
    subject: "重設密碼驗證",
    text: "你的驗證碼是" + randCode
    }
    transporter.sendMail(mailOption, (error, info) => {
    if (error) console.log(error);
    else console.log("sent" + info.response)
    })
    res.sendStatus(200);
    console.log("驗證中");
    return;
}