const transporter = require('../../../../modules/util/nodeMailer')();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require("dotenv").config();

module.exports = async function(req, res) {
    const userTable = await sqlConnection.getUserTable();
    for (var i = 0; i < userTable.length; i++) {
        if (req.body.account !== userTable[i].username) continue;
        if (req.body.mail !== userTable[i].email) {
        res.sendStatus(403);//重設密碼失敗，電子郵件錯誤
        console.log("重設密碼失敗，電子郵件錯誤")
        return;
        }
        randCode = getRand();
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
    res.sendStatus(403);
    console.log("重設密碼失敗，查無此帳號")
}