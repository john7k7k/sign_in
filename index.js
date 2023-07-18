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
const API_VERSION = 'api/v1'
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
  const json_data = JSON.parse(rec_message.toString()); //parse資料
  console.log('主題',topic,', 時間: ',  (new Date()).toLocaleString()); //印出資料
  //sendLineNotify(convert(json_data)); //傳送lineNotify
  const topicInfo = topicDecode(topic);
  const fish_object = {};
  fish_object[topicInfo.section] = json_data;
  await sqlConnection.updateFishesData(fish_object); //更新sql資料
  sqlConnection.showFishesTable();
});

mqttConnection.on('error', (err) => {
  console.error('MQTT連接錯誤:', err);
})

//監聽port
const port = 443;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//前端

//1. 頁面
app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname, './static/dist/index.html'));
});
app.get(/\/static\/dist\/(?:login|SignUp)/, function(req, res) {
  res.sendFile(path.join(__dirname, './static/dist/index.html'));
});

app.get(/\/static\/dist\/(?:Fishdatas|EditDatas|UserData|home)/, verifyTokenBy('Cookie')(), function(req, res) {
  res.sendFile(path.join(__dirname, '/static/dist/index.html'));
});

// 2. 帳號 API

app.post(`/${API_VERSION}/account/login`, async function(req, res) {
  console.log(req.body);
  const userTable = await sqlConnection.getUserTable();
  for (let i = 0; i < userTable.length; i++) {
    if (req.body.username !== userTable[i].username) continue;
    if(md5(req.body.password) !== userTable[i].passcode){
      res.sendStatus(403); //密碼錯誤
      return;
    }
    jwt.sign(
      { username: req.body.username },
      process.env.DB_JWTKEY,
      {expiresIn: '9000s'},
      async (err, token) => {
        resData  = await sqlConnection.getUserData(req.body.username,basis = 'username');
        resData.passcode = undefined;
        let fishesID = {};
        if(resData.section === '001') fishesID = await sqlConnection.getFishesActive();
        else fishesID[resData.section] = (await sqlConnection.getFishesActive())[resData.section];
        res.json({
          ...resData,
          fishesID,
          token,
        });
      }
    )
    return
  }
  res.sendStatus(403); //
  console.log("無帳號")
});

app.post(`/${API_VERSION}/account/sign_up`,async function(req, res) {
  const userTable = await sqlConnection.getUserTable();
  for (var i = 0; i < userTable.length; i++) {
    if (req.body.username === userTable[i].username) {
      res.sendStatus(403); //"註冊失敗，帳號已存在"
      return;
    }
  }
  sqlConnection.createUser({
    username: req.body.username,
    email: req.body.mail,
    passcode: md5(req.body.password),
    registrationTime: (new Date).getTime(),
    level: 10,
    section: req.body.section
  })
  res.sendStatus(200); //註冊成功
})

app.post(`/${API_VERSION}/account/reset_password`,async function(req, res) {
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

app.post(`/${API_VERSION}/account/reset_password_check`, function(req, res) {
  console.log(req.body)
  if (req.body.code === randCode) {
    sqlConnection.revisePasscode(req.body.account, md5(req.body.password))
    res.sendStatus(200);
    console.log("重設密碼成功");
    randCode = getRand();
    return;
  }
  res.sendStatus(403);
  console.log("重設密碼失敗，驗證碼錯誤")
})

app.post(`/${API_VERSION}/account/logout/`, verifyTokenBy('Header')(),  async (req, res) => {
  res.sendStatus(200);
})

app.post(`/${API_VERSION}/account/delete_user`, verifyTokenBy('Header')(),  async (req, res) => {
  sqlConnection.deleteUser(req.payload.username, basis = 'username');
  res.sendStatus(200);
})

app.get(`/${API_VERSION}/account/`, verifyTokenBy('Header')(), async (req, res) => { 
  let userData = await sqlConnection.getUserData(req.payload.username, basis = 'username');
  let fishesID = {};
  if(userData.section === '001') fishesID = await sqlConnection.getFishesActive();
  else fishesID[userData.section] = (await sqlConnection.getFishesActive())[userData.section];
  console.log(fishesID)
  const resData = {...userData, fishesID};
  resData.passcode = undefined;
  res.json(resData)
});

app. get(`/${API_VERSION}/account/list`, verifyTokenBy('Header')(20), async (req, res) => { 
  res.send(await sqlConnection.getUserTable(req.query.section));
});

app.post(`/${API_VERSION}/account/revise/level`, verifyTokenBy('Header')(20), async (req, res) => { 
  const adminLevel = (await sqlConnection.getUserData(req.payload.username,basis = 'username')).level
  if(req.body.newLevel < adminLevel){
    res.sendStatus(403);
    return;
  }
  if((await sqlConnection.getUserData(req.body.username,basis = 'username')).level < adminLevel){
    res.sendStatus(403);
    return;
  }
  sqlConnection.reviseUserLevel(req.body.username, req.body.newLevel);
  res.sendStatus(200);
});

app.post(`/${API_VERSION}/account/revise/section`, verifyTokenBy('Header')(10), async (req, res) => {
  sqlConnection.reviseUserSection(req.body.username, req.body.newSection);
  res.sendStatus(200);
})

// 3. Fish API

//此API可新增fish的data
app.post(`/${API_VERSION}/fish/data/`, verifyTokenBy('Header')(40),  async (req, res) => {
  try{
    const { fishData } = req.body; //取得參數
    const { section } = req.query;
    if(fishData===undefined||section===undefined){
      res.sendStatus(403);
      return;
    }
    const fish_object = {};
    fish_object[section] = fishData;
    await sqlConnection.updateFishesData(fish_object); //從SQL中更新所求的data
    await sqlConnection.showFishesTable(sqlConnection.getFishesID());
    res.sendStatus(200);
  }
  catch{res.sendStatus(403);}
})

//此API可取得fish的table，路由參數fish_ids以逗號分隔多個id，例如: /sql/fish_data/IDs=23,24,26，
app.get(`/${API_VERSION}/fish/table/`, verifyTokenBy('Header')(50), async (req, res) => { 
  try{
    const { fishesID, section } = req.query; //取得路由參數
    const fish_id_array = fishesID.match(/(\d+)/g); //將路由參數轉為id陣列
    const fish_object = {};
    fish_object[section] = fish_id_array;
    const tables = await sqlConnection.getFishesTable(fish_object) //從SQL中取得所求的table
    res.send(tables);
  }
  catch{res.sendStatus(403);}
});

//此API可取得fish的最新data
app.get(`/${API_VERSION}/fish/data/`, verifyTokenBy('Header')(50), async (req, res) => { 
  try{
    const { fishesID, section } = req.query; //取得路由參數
    fish_id_array = fishesID.match(/(\d+)/g); //將路由參數轉為id陣列
    const fish_object = {};
    fish_object[section] = fish_id_array;
    const datas = await sqlConnection.getFishesData(fish_object); //從SQL中取得所求的data
    res.send(datas);
  }
  catch{res.sendStatus(403);}
});

//此API可取得fish的指定版本data
app.get(`/${API_VERSION}/fish/history_data/`, verifyTokenBy('Header')(50), async (req, res) => { 
  try{
    let { fishesID, section, versions } = req.query; //取得路由參數
    fishesID = fishesID.match(/(\d+)/g); //將路由參數轉為id陣列
    versions = versions.match(/(\d+)/g); //將路由參數轉為version陣列
    const fish_object = {};
    for(let i = 0; i < fishesID.length; i++){
      if(fish_object[section]===undefined) fish_object[section]={};
      fish_object[section][fishesID[i]] =versions[i];
    }
    const datas = await sqlConnection.getFishesData(fish_object,history=true); //從SQL中取得所求的data
    res.send(datas) //從SQL中取得所求的data
  }
  catch{res.sendStatus(403);}
});

//此API可控制fish (LED,action,mode)
app.post(`/${API_VERSION}/fish/control/`, verifyTokenBy('Header')(60), async (req, res) => {
  try{
    const { fishControl } = req.body; //取得參數
    const { section } = req.query;

    for(key in fishControl){
      const fish_string = JSON.stringify(fishControl[key]); //轉換為json字串
      mqttConnection.publish('Fish/set/' + sectionDecode(section) + '/' + key,fish_string);
      console.log('Fish/set/' + sectionDecode(section) + '/' + key);
      console.log(fish_string);
    }
    res.sendStatus(200);
  }
  catch{res.sendStatus(403);}
})

function convert(message){ //解析IOT端
  const date = new Date();
  var data = date.toLocaleString();
  for(i in message){
    data+='\n'+'id: '+i+', '+'bc: '+message[i]['bc']+', '+'err: '+message[i]['err']+', '+'active: '+message[i]['active'];
  }
  return data
}

function verifyTokenBy(tokenFrom = 'URL'){
  return (threshold = 0) => {
    return (req, res, next) => {
      let token = '';
      if(tokenFrom === 'URL') token = req.query.token;
      else if(tokenFrom === 'Header') token = req.headers['authorization'].split(' ')[1];
      else if(tokenFrom === 'Cookie') token = req.cookies.token;
      jwt.verify(token, process.env.DB_JWTKEY, async (err, payload) => {
        if (err) {
          res.sendStatus(403);
          console.log(err);
          return;
        }
        req.payload = payload;
        if(threshold === 0) {
          next();
          return;
        }
        const { level, section } = await sqlConnection.getUserData(payload.username, basis = 'username');
        if(level > threshold) res.sendStatus(403);
        else if(section !== req.query.section && section !== '001') res.sendStatus(403);
        else next();
      })
    }
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

function topicDecode(topic){
  const topicArray = topic.split('/');
  return {
    main: topicArray[0],
    type: topicArray[1],
    section: sectionEecode(topicArray[2]),
    command: topicArray[3]
  }
}

function sectionEecode(section_name){
  switch(section_name){
    case 'ntut':
      return '002'
    case 'nmmst':
      return '003'
    case 'twincn':
      return '004'
  }
}

function sectionDecode(section_name){
  switch(section_name){
    case '002':
      return 'ntut'
    case '003':
      return 'nmmst'
    case '004':
      return 'twincn'
  }
}