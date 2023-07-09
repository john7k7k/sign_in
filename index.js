const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv").config();
const md5 = require('blueimp-md5');
const jwt = require('jsonwebtoken');
const mqttConnection = require('./my_modules/mqtt')();
const sendLineNotify = require('./my_modules/lineNotify');
const transporter = require('./my_modules/nodeMailer')();
const sqlConnection = require('./my_modules/sql')();
let randCode = getRand();

((app) => { //init app
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())
  app.use("/static", express.static('./static'));
  app.use("/login", express.static('./static/login'));
  app.use("/media", express.static('./static/login/media'));
  app.use("/distjs", express.static('./static/dist/js/'));
  app.use("/distfonts", express.static('./static/dist/fonts/'));
  app.use("/distcss", express.static('./static/dist/css/'));
  app.use("/dist", express.static('./static/dist/'));
})(app)

sqlConnection.buildUserTable();

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
  res.sendFile(path.join(__dirname, './static/dist/index.html'));
});
app.get('/static/dist/login', function(req, res) {
  res.sendFile(path.join(__dirname, './static/dist/index.html'));
});

app.get('/home', verifyTokenBy('URL'), function(req, res) {
  res.sendFile(path.join(__dirname, '/static/dist/index.html'));
})
app.get('/static/dist/home', verifyTokenBy('Cookie'), function(req, res) {
  res.sendFile(path.join(__dirname, '/static/dist/index.html'));
})

app.get('/static/dist/Fishdatas', verifyTokenBy('Cookie'), function(req, res) {
  res.sendFile(path.join(__dirname, '/static/dist/index.html'));
});

app.post('/api1/login_respond', async function(req, res) {
  console.log(req.body);
  const userTable = await sqlConnection.getUserTable();
  for (let i = 0; i < userTable.length; i++) {
    if (req.body.account !== userTable[i].username) continue;
    if(md5(req.body.password) !== userTable[i].passcode){
      res.sendStatus(403); //密碼錯誤
      return;
    }
    jwt.sign(
      { username: req.body.account },
      process.env.DB_JWTKEY,
      {expiresIn: '900s'},
      (err, token) => {
        res.json({username: req.body.account,token});
        console.log("b");
        res.cookie('token', token,{maxAge:900000,httpOnly:true});
        console.log("c");
        console.log(token);
        res.redirect('/static/dist/home');
      }
    )
    return
  }
  res.sendStatus(403); //
  console.log("無帳號")
});

app.post('/api1/sign_up',async function(req, res) {
  const userTable = await sqlConnection.getUserTable();
  for (var i = 0; i < userTable.length; i++) {
    if (req.body.account === userTable[i].username) {
      res.sendStatus(403); //"註冊失敗，帳號已存在"
      return;
    }
  }
  sqlConnection.createUser({
    username: req.body.account,
    email: req.body.mail,
    passcode: md5(req.body.password),
    registrationTime: (new Date).getTime(),
    level: 1
  })
  res.sendStatus(200); //註冊成功
})

app.post('/api1/reset_response',async function(req, res) {
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
})

app.post('/api1/reset_check_code', function(req, res) {
  console.log(req.body)
  if (req.body.code === randCode) {
    sqlConnection.revisePasscode(req.body.account,md5(req.body.password))
    res.sendStatus(200);
    console.log("重設密碼成功");
    randCode = getRand();
    return;
  }
  res.sendStatus(403);
  console.log("重設密碼失敗，驗證碼錯誤")
})

app.post('/api1/logout/', verifyTokenBy('Header'),  async (req, res) => {
  res.sendStatus(200);
})

app.post('/api1/delete_user/', verifyTokenBy('Header'),  async (req, res) => {
  sqlConnection.deleteUser(req.payload.username,basis = 'username');
  res.sendStatus(200);
})

app.get('/api1/account/init/', verifyTokenBy('Header'), async (req, res) => { 
  const resData = {
    userData: await sqlConnection.getUserData(req.payload.username, basis = 'username'),
    fishesID: await sqlConnection.getFishesID()
  }
  resData.userData.passcode = undefined;
  res.send(resData)
});

// 2. Fish Data API

//此API可新增fish的data
app.post('/api1/fish_data/', verifyTokenBy('Header'),  async (req, res) => {
  const { fishData } = req.body; //取得參數
  await sqlConnection.updateFishesData(fishData); //從SQL中更新所求的data
  res.send("設定成功");
})

//此API可取得fish的table，路由參數fish_ids以逗號分隔多個id，例如: /sql/fish_data/IDs=23,24,26，
app.get('/api1/fish_table/:fish_ids', verifyTokenBy('Header'), async (req, res) => { 
  const { fish_ids } = req.params; //取得路由參數
  fish_id_array = fish_ids.match(/(\d+)/g); //將路由參數轉為id陣列
  console.log(fish_id_array);
  let tables = await sqlConnection.getFishesTable(fish_id_array) //從SQL中取得所求的table
  res.send(tables);
});

//此API可取得fish的最新data
app.get('/api1/fish_data/:fish_ids', verifyTokenBy('Header'), async (req, res) => { 
  const { fish_ids } = req.params; //取得路由參數
  fish_id_array = fish_ids.match(/(\d+)/g); //將路由參數轉為id陣列
  const datas = await sqlConnection.getFishesData(fish_id_array); //從SQL中取得所求的data
  res.send(datas);
});

//此API可取得fish的指定版本data
app.get('/api1/fish_history_data/:fish_ids/:fish_versions', verifyTokenBy('Header'), async (req, res) => { 
  let { fish_ids, fish_versions } = req.params; //取得路由參數
  fish_id_array = fish_ids.match(/(\d+)/g); //將路由參數轉為id陣列
  fish_versions = fish_versions.match(/(\d+)/g); //將路由參數轉為version陣列
  const datas = await sqlConnection.getFishesData(fish_id_array,fish_versions); //從SQL中取得所求的data
  res.send(datas);
});

//此API可設定fish的LED Color
app.post('/api1/fish_color/', verifyTokenBy('Header'), async (req, res) => {
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

function verifyTokenBy(method = 'URL'){
  return (req, res, next) => {
    let token = '';
    if(method === 'URL') token = req.query.token;
    else if(method === 'Header') token = req.headers['authorization'].split(' ')[1];
    else if(method === 'Cookie') token = req.cookies.token;
    jwt.verify(token, process.env.DB_JWTKEY, (err, payload) => {
      if (err) {
        res.sendStatus(403);
        console.log(err);
      }
      else {
        req.payload = payload;
        next();
      }
    })
  }
}

function getRand(){
  let randomString = '';
  for (let i = 0; i < 6; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    randomString += randomDigit.toString();
  }
  return randomString;
}
