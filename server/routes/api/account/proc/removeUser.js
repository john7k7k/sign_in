const transporter = require('../../../../modules/util/nodeMailer')();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require("dotenv").config();

module.exports = async (req, res) => { 
    await prisma.user.delete({
    where: {username: req.body.username}
    });
    const mailOption = {
    from: process.env.DB_GMAIL_ACCOUNT,
    to: req.user.email,
    subject: "aifish.cc 提醒",
    text: `您的帳號'${req.body.username}'已被移除`
    }
    transporter.sendMail(mailOption, (error, info) => {
    if (error) console.log(error);
    else console.log("sent" + info.response)
    })
    res.sendStatus(200);
}