const express = require('express');
const app = express();
const fetch = require('node-fetch')
const cors = require('cors');
const path = require('path');
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const mysql = require('mysql');
const md5 = require('blueimp-md5')
const mqtt = require('mqtt');
const port = 80;
const mqtt_ip = 'mqtt://20.89.131.34:1884'
const client = mqtt.connect(mqtt_ip, {
    username: 'lab314',
    password: 'lab314fish'
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "robot.send.auto.mail@gmail.com",
    pass: "ngywhkrdognvhxti"
  }
});
const lineNotifyEndpoint = 'https://notify-api.line.me/api/notify';
const accessToken = 'fyW2bnAJTjQd1yVMkWYIRK95lVTqldPWeZny7PKWWZA';
var connection;
var randCode, pos, mypass;

function sendLineNotify(message) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${accessToken}`
  };

  const data = new URLSearchParams();
  data.append('message', message);

  return fetch(lineNotifyEndpoint, {
    method: 'POST',
    headers,
    body: data
  });
}

function Account(username, mail, password) {
  this.account = username;
  this.mail = mail;
  this.password = password;
}

var list = [new Account("123", "ppp1244qqq@gmail.com", "250cf8b51c773f3f8dc8b4be867a9a02")];

dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/static", express.static('./static'));
app.use("/media", express.static('./static/media'));

client.on('connect', () => {
  console.log('已連接到MQTT');
  client.subscribe('Fish/info',(err) => {
    if (err) {
      console.error('訂閱資訊失敗:', err);
    } else {
      console.log('資訊已訂閱');
    }
  });
});

client.on('message', (topic, rec_message) => {
  console.log('主題',topic,' 接收到: ', rec_message.toString());
  sendLineNotify(rec_message.toString())
  .then(() => {
    console.log('Line Notify message sent successfully');
  })
  .catch((error) => {
    console.error('Error sending Line Notify message:', error);
  });
});

client.on('error', (err) => {
  console.error('MQTT連接錯誤:', err);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/my.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/api/sql/fish_data', (req, res) => {
  const query = 'SELECT * FROM testForm2';
  // 執行資料庫查詢
  connection = mysql.createConnection({
    host: '20.89.131.34',
    port:3307,
    user: process.env.DB_SQL_USER,
    password: process.env.DB_SQL_PASSWORD,
    database: 'lab314'
  });
  connection.query(query, (err, results) => {
    if (err) {
      console.error('查詢資料庫時出錯:', err);
      res.status(500).json({ error: '無法從資料庫中獲取資料' });
    } else {
      res.json(results);
    }
  });
  connection.end()
});

app.post('/login_respond', function(req, res) {
  console.log(req.body);
  let response_data = "查無此帳號"
  for (let i = 0; i < list.length; i++) {
    if (req.body.account !== list[i].account) continue;
    if (req.body.password !== list[i].password) {
      response_data = "密碼錯誤";
      break;
    }
    response_data = "登入成功 帳號: " + req.body.account
  }
  console.log(response_data)
  res.send(response_data);
});

app.post('/sign_up', function(req, res) {
  for (var i = 0; i < list.length; i++) {
    if (req.body.account === list[i].account) {
      res.send("註冊失敗，帳號已存在");s
      console.log("註冊失敗，帳號已存在")
      return;
    }
  }
  console.log(req.body);
  console.log("註冊成功")
  list.push(new Account(req.body.account, req.body.mail, req.body.password))
  res.send("註冊成功，帳號: " + req.body.account);
})

app.post('/reset_response', function(req, res) {
  for (var i = 0; i < list.length; i++) {
    if (req.body.account !== list[i].account) continue;
    if (req.body.mail !== list[i].mail) {
      res.send("重設密碼失敗，電子郵件錯誤");
      console.log("重設密碼失敗，電子郵件錯誤")
      return;
    }
    randCode = getRand(1000, 9999)
    let mailOption = {
      from: "robot.send.auto.mail@gmail.com",
      to: req.body.mail,
      subject: "重設密碼驗證",
      text: "你的驗證碼是" + randCode
    }
    transporter.sendMail(mailOption, (error, info) => {
      if (error) console.log(error);
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

app.post('/reset_check_code', function(req, res) {
  console.log(req.body)
  if (req.body.code === randCode) {
    list[pos].password = mypass;
    res.send("重設密碼成功");
    console.log("重設密碼成功");
    return;
  }
  res.send("重設密碼失敗，查無此帳號");
  console.log("重設密碼失敗，查無此帳號")
})