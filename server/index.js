const express = require('express');
const app = express();
const multer = require('multer');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs')
const dotenv = require("dotenv").config();
const md5 = require('blueimp-md5');
const jwt = require('jsonwebtoken');

const sectionProcess = require('./my_modules/section')();
const mqttConnection = require('./my_modules/mqtt')();
const lineNotify = require('./my_modules/lineNotify')();
const transporter = require('./my_modules/nodeMailer')();
const sqlConnection = require('./my_modules/sql')();
const API_VERSION = 'api/v1'
const upload = multer({ 
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/videos'); // 設定影片上傳的目錄
    },
    filename(req, file, cb) {
      cb(null, req.query.video_uid+'.mp4'); // 設定影片的檔名
    }
  })
});



let randCode = getRand();
const sub_topics = ['Fish/info/ntut','Fish/info/nmmst','Fish/info/pmp','Fish/alarm/ntut','Fish/alarm/nmmst','Fish/alarm/pmp'];

((app,sqlConnection) => { //init app, sql
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())
  app.use("/public", express.static('../public'));
  app.use("/img", express.static('../public/img'));
  app.use("/js", express.static('../public/js/'));
  app.use("/fonts", express.static('../public/fonts/'));
  app.use("/css", express.static('../public/css/'));
  app.use("/index", express.static('../public/'));
  sqlConnection.buildVideoTable();
  sqlConnection.buildUserTable();
})(app,sqlConnection)

//mqtt處理

mqttConnection.on('connect', () => {
  console.log('已連接到MQTT');
  for (let sub_topic of sub_topics){
    mqttConnection.subscribe(sub_topic,(err) => {
      if (err) {
        console.error(`${sub_topic}訂閱失敗:`, err);
      } else {
        console.log(`${sub_topic}已訂閱`);
      }
    });
  }
});

mqttConnection.on('message',async (topic, rec_message) => { //接收到IOT端訊息
  const json_data = JSON.parse(rec_message.toString()); //parse資料
  console.log('主題',topic,', 時間: ',  (new Date()).toLocaleString()); //印出資料
  mqttProcess(topic,json_data);
});

mqttConnection.on('error', (err) => {
  console.error('MQTT連接錯誤:', err);
})

//監聽port
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//前端

//1. 頁面
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get(/\/(?:login|sign/up)/, function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get(/\/(?:ntut/fish|nmmst/fish|ntut/fish/edit|nmmst/fish/edit|user|home|fish/list|account/list|404)/, verifyTokenBy('Cookie')(), function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});



// 2. 帳號 API

app.post(`/${API_VERSION}/account/login/`, async function(req, res) {
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
        let videoTime = await sqlConnection.getVideosData(resData.section);
        console.log(videoTime)
        if(resData.section === '001') {
          fishesID = await sqlConnection.getFishesActive();
        }
        else fishesID[resData.section] = (await sqlConnection.getFishesActive())[resData.section];
        res.json({
          ...resData,
          fishesID,
          videoTime,
          token,
        });
      }
    )
    return
  }
  res.sendStatus(403); //
  console.log("無帳號")
});

app.post(`/${API_VERSION}/account/sign_up/`, verifyUserData(),async function(req, res) {
  const userTable = await sqlConnection.getUserTable();
  for (var i = 0; i < userTable.length; i++) {
    if (req.body.username === userTable[i].username) {
      res.status(403).send('帳號已存在')
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

app.post(`/${API_VERSION}/account/reset_password/`,async function(req, res) {
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

app.post(`/${API_VERSION}/account/reset_password_check/`, function(req, res) {
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

app.post(`/${API_VERSION}/account/delete_user/`, verifyTokenBy('Header')(),  async (req, res) => {
  const { email } = await sqlConnection.getUserData(req.payload.username, basis = 'username');
  sqlConnection.deleteUser(req.payload.username, basis = 'username');
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

app.get(`/${API_VERSION}/account/list/`, verifyTokenBy('Header')(20), async (req, res) => { 
  const resData = await sqlConnection.getUserTable(req.query.section);
  for(let userData of resData){
    userData.passcode = undefined;
  }
  res.send(resData);
});

app.post(`/${API_VERSION}/account/remove_user/`, verifyTokenBy('Header')(20), async (req, res) => { 
  const { level: adminLevel, section: adminSection } = await sqlConnection.getUserData(req.payload.username,basis = 'username');
  const { levle: userLevel, email: userEmail, section: userSection } = await sqlConnection.getUserData(req.body.username,basis = 'username');
  if(userLevel < adminLevel){
    res.sendStatus(403);
    return;
  }
  if(adminSection !== '001' && userSection !== adminSection){
    res.sendStatus(403);
    return;
  }
  sqlConnection.deleteUser(req.body.username, basis = 'username');
  const mailOption = {
    from: process.env.DB_GMAIL_ACCOUNT,
    to: userEmail,
    subject: "aifish.cc 提醒",
    text: `您的帳號'${req.payload.username}'已被移除`
  }
  transporter.sendMail(mailOption, (error, info) => {
    if (error) console.log(error);
    else console.log("sent" + info.response)
  })
  res.sendStatus(200);
});

app.post(`/${API_VERSION}/account/revise/level/`, verifyTokenBy('Header')(20), async (req, res) => { 
  const { adminLevel, adminSection } = await sqlConnection.getUserData(req.payload.username,basis = 'username');
  const { userLevel, userSection } = await sqlConnection.getUserData(req.body.username,basis = 'username');
  if(req.body.newLevel < adminLevel || userLevel < adminLevel){
    res.sendStatus(403);
    return;
  }
  if(adminSection !== '001' && userSection !== adminSection){
    res.sendStatus(403);
    return;
  }
  sqlConnection.reviseUserLevel(req.body.username, req.body.newLevel);
  res.sendStatus(200);
});

app.post(`/${API_VERSION}/account/revise/section/`, verifyTokenBy('Header')(10), async (req, res) => {
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
      mqttConnection.publish('Fish/set/' + sectionProcess.code.decode(section) + '/' + key,fish_string);
      console.log('Fish/set/' + sectionProcess.code.decode(section) + '/' + key);
      console.log(fish_string);
    }
    res.sendStatus(200);
  }
  catch{res.sendStatus(403);}
})

app.post(`/${API_VERSION}/fish/delete/`, verifyTokenBy('Header')(30),  async (req, res) => {
  try{
    const { fishesID } = req.body; //取得參數
    const { section } = req.query;
    console.log(fishesID)
    if(!section){
      res.sendStatus(403);
      return;
    }
    sqlConnection.deleteFishesTable({ [section]: fishesID })
    res.sendStatus(200);
  }
  catch{res.sendStatus(403);}
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 3. 影片API
// 定義路由處理影片上傳請求
app.post(`/${API_VERSION}/video/upload/`, upload.single('video'), (req, res) => {
  // 獲取上傳的影片檔案資訊
  const { file } = req;
  const { video_uid } = req.query;
  if (!file) {
    return res.status(400).send('No video uploaded.');
  }
  return res.status(200).send('Video uploaded successfully.');
});

app.get(`/${API_VERSION}/video/`, verifyTokenBy('Header')(20), (req, res) => {
  const { video_uid, section } = req.query;
  mqttConnection.publish(`Fish/video/${sectionProcess.code.decode(section)}/get`,video_uid,()=>{
   
  })
  const filePath = `uploads/videos/${video_uid + '.mp4'}`;
  sendVideo(res,filePath);
});

function verifyTokenBy(tokenFrom = 'URL'){
  return (threshold = 0) => {
    return (req, res, next) => {
      let token = '';
      try{
        if(tokenFrom === 'URL') token = req.query.token;
        else if(tokenFrom === 'Header') token = req.headers['authorization'].split(' ')[1];
        else if(tokenFrom === 'Cookie') token = req.cookies.token;
      }
      catch{
        res.sendStatus(403);
      }
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
    section: sectionProcess.code.encode(topicArray[2]),
    command: topicArray[3]
  }
}

async function mqttProcess(topic,mqtt_data){
  switch(topic){
    case "Fish/alarm/ntut":
      const video_data = {
        videoUID: mqtt_data.video_uid,
        time: mqtt_data.time,
        section: sectionProcess.code.encode(topic.split('/')[2]),
        fishID: Object.keys(mqtt_data)[0],
        status: mqtt_data[Object.keys(mqtt_data)[0]]
      }
      sqlConnection.updateVideo(video_data)
      mqtt_data.section = topic.split('/')[2];
      lineNotify.send(mqtt_data, decode = lineNotify.decodeFishesAlarm);
    break;
    default :
      delete mqtt_data.time
      const topicInfo = topicDecode(topic);
      const fish_object = {};
      fish_object[topicInfo.section] = mqtt_data;
      await sqlConnection.updateFishesData(fish_object); //更新sql資料
      sqlConnection.showFishesTable();
    break;
  }
}

function sendVideo(res,videoPath) {
  fs.stat(videoPath, (err, stats) => {
    if (!err) {
      res.sendFile(path.resolve(videoPath),()=>{
        fs.unlink(videoPath,()=>{});
      })
    }
    else{
      setTimeout(()=>sendVideo(res,videoPath),300)
    }
  });
}

function verifyUserData(){
  return (req, res, next) => {
    const { username, mail, password, section} = req.body;
    if(! (username && mail && password && section)) res.sendStatus(403);
    else if(! (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(mail))) res.status(403).send('電子郵件不合法')
    else next();
  }
}
