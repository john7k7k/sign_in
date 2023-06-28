const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv");
const md5 = require('blueimp-md5')
const mysql = require('./sql');
const mqttConnection = require('./mqtt')();
const sendLineNotify = require('./lineNotify');
const transporter = require('./nodeMailer')();
const sqlConnection = require('./sql')();

var randCode, pos, mypass;

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
app.use("/login", express.static('./static/login'));
app.use("/media", express.static('./static/login/media'));

//mqtt處理

mqttConnection.on('connect', () => {
  console.log('已連接到MQTT');
  mqttConnection.subscribe('Fish/info1',(err) => {
    if (err) {
      console.error('Fish/info1訂閱失敗:', err);
    } else {
      console.log('Fish/info1已訂閱');
    }
  });
});

mqttConnection.on('message',async (topic, rec_message) => { //接收到IOT端訊息
  json_data = JSON.parse(rec_message.toString()); //parse資料
  console.log('主題',topic,', 時間: ',  (new Date()).toLocaleString()); //印出資料
  //sendLineNotify(convert(json_data)); //傳送lineNotify
  //sqlConnection = mysql(); //連接mysql
  await sqlConnection.updateFishesData(json_data); //更新sql資料
  sqlConnection.showFishesTable();
  //sqlConnection.end(); //斷開sql連接
});

mqttConnection.on('error', (err) => {
  console.error('MQTT連接錯誤:', err);
})

//監聽port
const port = 80;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//前端API

// 1. Login API
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/static/my.html'));
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

// 2. Fish Data API
//此API可新增fish的data
app.put('/sql/put/fish_data/:fish_json',  async (req, res) => {
  const { fish_json } = req.params; //取得路由參數
  fish_json = JSON.parse(fish_json); //轉換為json格式
  //const sqlConnection = mysql();
  await sqlConnection.updataFishesData(fish_json); //從SQL中取得所求的data
  //sqlConnection.end();
  res.send("設定成功");
})


//此API可取得fish的table，路由參數fish_ids以逗號分隔多個id，例如: /sql/fish_data/IDs=23,24,26，
app.get('/sql/get/fish_table/IDs=:fish_ids', async (req, res) => { 
  const { fish_ids } = req.params; //取得路由參數
  fish_id_array = fish_ids.match(/(\d+)/g); //將路由參數轉為id陣列
  console.log(fish_id_array);
  //const sqlConnection = await mysql();
  let tables = await sqlConnection.getFishesTable(fish_id_array) //從SQL中取得所求的table
  //sqlConnection.end();
  res.send(tables);
});

//此API可取得fish的最新data
app.get('/sql/get/fish_data/IDs=:fish_ids', async (req, res) => { 
  const { fish_ids } = req.params; //取得路由參數
  fish_id_array = fish_ids.match(/(\d+)/g); //將路由參數轉為id陣列
  //const sqlConnection = mysql();
  const datas = await sqlConnection.getFishesData(fish_id_array); //從SQL中取得所求的data
  //sqlConnection.end();
  res.send(datas);
});

function convert(message){ //解析IOT端
  const date = new Date();
  var data = date.toLocaleString();
  for(i in message){
    data+='\n'+'id: '+i+', '+'bc: '+message[i]['bc']+', '+'err: '+message[i]['err']+', '+'active: '+message[i]['active'];
  }
  //console.log(data);
  return data
}

