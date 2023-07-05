const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv");
const md5 = require('blueimp-md5');
const jwt = require('jsonwebtoken');
const mqttConnection = require('./my_modules/mqtt')();
const sendLineNotify = require('./my_modules/lineNotify');
const transporter = require('./my_modules/nodeMailer')();
const sqlConnection = require('./my_modules/sql')();

var randCode, pos, mypass;

function Account(username, mail, password) {
  this.account = username;
  this.mail = mail;
  this.password = password;
}
let tokens = new Object();
var list = [new Account("123", "ppp1244qqq@gmail.com", "735434cae08df8e591c1549da88c6d87")];

dotenv.config()
app.use(express.json())
app.use(cors())
app.use("/static", express.static('./static'));
app.use("/login", express.static('./static/login'));
app.use("/media", express.static('./static/login/media'));

app.use("/distjs", express.static('./static/dist/js/'));
app.use("/distfonts", express.static('./static/dist/fonts/'));
app.use("/distcss", express.static('./static/dist/css/'));
app.use("/dist", express.static('./static/dist/'));


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
  await sqlConnection.updateFishesData(json_data); //更新sql資料
  sqlConnection.showFishesTable();
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
app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, './static/login/my.html'));
});

app.get('/about', function(req, res) {
  const { token } = req.query;
  console.log(token);
  jwt.verify(token, process.env.DB_JWTKEY, (err, payload) => {
    if (err) {
      res.sendStatus(403);
      console.log(err);
    }
    else res.sendFile(path.join(__dirname, '/static/dist/idex.html'));
  })
});


app.post('/login_respond', function(req, res) {
  console.log(req.body);
  let response_data = "查無此帳號"
  for (let i = 0; i < list.length; i++) {
    if (req.body.account !== list[i].account) continue;
    if (req.body.password !== list[i].password) {
      response_data = "密碼錯誤";
      res.sendStatus(403);
      return;
    }
    response_data = "登入成功 帳號: " + req.body.account
    console.log(response_data)
    jwt.sign(
      { username: req.body.account },
      process.env.DB_JWTKEY,
      {expiresIn: '300s'},
      (err, token) => {
        res.json({username: req.body.account,token})
      }
    )
    return;
  }
  res.sendStatus(404);
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

app.get('/', function(req, res) { //test
  /*
  const headers = req.headers;
  const token = headers['authorization']?.split(' ')[1];*/
  const { token } = req.query;
  console.log(token);
  jwt.verify(token, process.env.DB_JWTKEY, (err, payload) => {
    if (err) {
      res.sendStatus(403);
      console.log(err);
    }
    else res.sendFile(path.join(__dirname, '/static/dist/idex.html'));
  })
});

// 2. Fish Data API
//此API可新增fish的data
app.post('/api1/fish_data/',  async (req, res) => {
  const { fish_json } = req.body.fishData; //取得參數
  fish_json = JSON.parse(fish_json); //轉換為json格式
  await sqlConnection.updataFishesData(fish_json); //從SQL中取得所求的data
  res.send("設定成功");
})

//此API可取得fish的table，路由參數fish_ids以逗號分隔多個id，例如: /sql/fish_data/IDs=23,24,26，
app.get('/api1/fish_table/:fish_ids', async (req, res) => { 
  const { fish_ids } = req.params; //取得路由參數
  fish_id_array = fish_ids.match(/(\d+)/g); //將路由參數轉為id陣列
  console.log(fish_id_array);
  let tables = await sqlConnection.getFishesTable(fish_id_array) //從SQL中取得所求的table
  res.send(tables);
});

//此API可取得fish的最新data
app.get('/api1/fish_data/:fish_ids', async (req, res) => { 
  const { fish_ids } = req.params; //取得路由參數
  fish_id_array = fish_ids.match(/(\d+)/g); //將路由參數轉為id陣列
  const datas = await sqlConnection.getFishesData(fish_id_array); //從SQL中取得所求的data
  res.send(datas);
});

//此API可取得fish的指定版本data
app.get('/api1/fish_history_data/:fish_ids/:fish_versions', async (req, res) => { 
  let { fish_ids, fish_versions } = req.params; //取得路由參數
  fish_id_array = fish_ids.match(/(\d+)/g); //將路由參數轉為id陣列
  fish_versions = fish_versions.match(/(\d+)/g); //將路由參數轉為version陣列
  const datas = await sqlConnection.getFishesData(fish_id_array,fish_versions); //從SQL中取得所求的data
  res.send(datas);
});

//此API可設定fish的LED Color
app.post('/api1/fish_color/', async (req, res) => {
  const { fishColor } = req.body; //取得參數
  const fish_string = JSON.stringify(fishColor); //轉換為json格式
  mqttConnection.publish('Fish/set1',fish_string);
  console.log(fish_string);
  res.send("設定成功");
})

function convert(message){ //解析IOT端
  const date = new Date();
  var data = date.toLocaleString();
  for(i in message){
    data+='\n'+'id: '+i+', '+'bc: '+message[i]['bc']+', '+'err: '+message[i]['err']+', '+'active: '+message[i]['active'];
  }
  //console.log(data);
  return data
}