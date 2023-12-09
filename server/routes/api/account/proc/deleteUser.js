const transporter = require('../../../../modules/util/nodeMailer')();
const { prisma } =  require('../../../../modules/util/myPrisma.js') ;
const dotenv = require("dotenv").config();

module.exports = async (req, res) => {
    const { email } = await prisma.user.findUnique({
        where: {username: req.payload.username}
    });
    await prisma.user.delete({
        where: {username: req.payload.username}
    })
    const mailOption = {
        from: process.env.DB_GMAIL_ACCOUNT,
        to: email,
        subject: "aifish.cc 註銷帳號提醒",
        text: `您的帳號'${req.payload.username}'已註銷`
    }
    transporter.sendMail(mailOption, (error, info) => {
        if (error) console.log(error);
        else console.log("sent" + info.response)
    })
    res.sendStatus(200);
}