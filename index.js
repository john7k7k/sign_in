const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const app = express();
dotenv.config()
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "t110310322@ntut.org.tw",
        pass:""
    }
});

var randCode,pos,mypass;

app.use(express.json())
app.use(cors())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/static/my.html'));
});
app.use("/static", express.static('./static'));
app.use("/media", express.static('./static/media'));


app.post('/post', function (req, res) {
    console.log(req.body);
    let loo = "查無此帳號"
    for(let i = 0; i < list.length ; i++){
        if(req.body.account !== list[i].account) continue;
        if(req.body.password !== list[i].password){
            loo = "密碼錯誤";
            break;
        }
        loo = "登入成功 帳號: " + req.body.account
    }
    console.log(loo)
    res.send(loo);
});

app.post('/sign_up', function (req, res) {
    for(var i = 0 ; i < list.length ; i++){
        if(req.body.account === list[i].account){
            res.send("註冊失敗，帳號已存在");
            console.log("註冊失敗，帳號已存在")
            return;
        }
    }
    console.log(req.body);
    console.log("註冊成功")
    list.push(new Account(req.body.account,req.body.mail,req.body.password))
    res.send("註冊成功，帳號: " + req.body.account);
})

app.post('/reset', function (req, res) {
    for(var i = 0 ; i < list.length ; i++){
        if(req.body.account !== list[i].account) continue;
        if(req.body.mail !== list[i].mail){
            res.send("重設密碼失敗，電子郵件錯誤");
            console.log("重設密碼失敗，電子郵件錯誤")
            return;
        }
        randCode = getRand(1000,9999)
        let mailOption = {
            from: "t110310322@ntut.org.tw",
            to: req.body.mail,
            subject: "重設密碼驗證",
            text:  "你的驗證碼是" + randCode
        }
        transporter.sendMail(mailOption,(error,info)=>{
            if(error) console.log(error);
            else console.log("sent" + info.response)
        })
        res.send("10");
        console.log("驗證中");
        pos = i;
        mypass = req.body.password;
        return;
    }
    res.send("重設密碼失敗，查無此帳號");
    console.log("重設密碼失敗，查無此帳號")
})

app.post('/reset2', function (req, res) {
    console.log(req.body)
    if(req.body.code === randCode){
        list[pos].password = mypass;
        res.send("重設密碼成功");
        console.log("重設密碼成功");
        return;
    }
    res.send("重設密碼失敗，查無此帳號");
    console.log("重設密碼失敗，查無此帳號")
})

const port = 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

function Account(username,mail,password){
    this.account = username;
    this.mail = mail;
    this.password = password;
}

var list = [new Account("123","ppp1244qqq@gmail.com","250cf8b51c773f3f8dc8b4be867a9a02")];

function getRand(min,max){
    let range = max-min;
    let rand = Math.random();
    return String(min+Math.round(rand*range))
}