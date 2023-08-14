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
const sql = require('./my_modules/newSQL');
let  sqlConnection;
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
const sub_topics = ['Fish/info/ntut/topicTest','Fish/info/nmmst/topicTest','Fish/info/pmp/topicTest','Fish/alarm/ntut/topicTest','Fish/alarm/nmmst/topicTest','Fish/alarm/pmp/topicTest'];

(async(app,sql) => { //init app
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())
  app.use("/public", express.static('../public'));
  app.use("/img", express.static('../public/img'));
  app.use("/js", express.static('../public/js/'));
  app.use("/fonts", express.static('../public/fonts/'));
  app.use("/css", express.static('../public/css/'));
  app.use("/index", express.static('../public/'));
  sqlConnection = await sql();
})(app,sql)

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
const port = 80;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//前端

//1. 頁面
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get(/\/(?:login|SignUp)/, function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get(/\/(?:Fishdatas-Section1|Fishdatas-Section3|EditDatas|UserData|home|FishDataList|AccountList)/, verifyTokenBy('Cookie')(), function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 2. 帳號 API

app.post(`/${API_VERSION}/account/login`, async function(req, res) {
  console.log(req.body);
  const userTable = await sqlConnection.userTable.get();
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
        resData  = await sqlConnection.userTable.get(req.body.username);
        resData.passcode = undefined;
        let fishesID = {};
        let videoTime = await sqlConnection.fishTable.video.get('section', resData.section);
        console.log(videoTime)
        if(resData.section === '001') {
          fishesID = await sqlConnection.fishTable.getStatus();
        }
        else fishesID[resData.section] = (await sqlConnection.fishTable.getStatus())[resData.section];
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

app.post(`/${API_VERSION}/account/sign_up`, verifyUserData(),async function(req, res) {
  const userTable = await sqlConnection.userTable.get();
  for (var i = 0; i < userTable.length; i++) {
    if (req.body.username === userTable[i].username) {
      res.send('帳號已存在').status(403); //"註冊失敗，帳號已存在"
      return;
    }
  }
  sqlConnection.userTable.insert({
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
  const userTable = await sqlConnection.userTable.get();
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
    sqlConnection.userTable.update(req.body.username, 'passcode', md5(req.body.password))
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
  sqlConnection.userTable.remove(req.payload.username);
  const mailOption = {
    from: process.env.DB_GMAIL_ACCOUNT,
    to: req.body.mail,
    subject: "aifish.cc 註銷帳號提醒",
    text: `帳號'${req.payload.username}'已註銷`
  }
  transporter.sendMail(mailOption, (error, info) => {
    if (error) console.log(error);
    else console.log("sent" + info.response)
  })
  res.sendStatus(200);
})

app.get(`/${API_VERSION}/account/`, verifyTokenBy('Header')(), async (req, res) => { 
  let userData = await sqlConnection.userTable.get(req.payload.username);
  let fishesID = {};
  if(userData.section === '001') fishesID = await sqlConnection.fishTable.getStatus();
  else fishesID[userData.section] = (await sqlConnection.fishTable.getStatus())[userData.section];
  
  const resData = {...userData, fishesID};
  resData.passcode = undefined;
  res.json(resData)
});

app.get(`/${API_VERSION}/account/list`, verifyTokenBy('Header')(20), async (req, res) => { 
  let resData = {};
  if(req.query.section === '001'){
    for (let sectionCode of ['001','002','003','004'])
      resData[sectionCode] = await sqlConnection.userTable.get(sectionCode,key = 'section');
  } 
  else resData[req.query.section] = await sqlConnection.userTable.get(req.query.section,key = 'section');
  for(let usersData of Object.values(resData)){
    usersData = usersData.map(userData => delete userData.passcode)
  }
  res.send(resData);
});

app.post(`/${API_VERSION}/account/remove_user`, verifyTokenBy('Header')(20), async (req, res) => { 
  const { adminLevel, adminSection } = await sqlConnection.userTable.get(req.payload.username);
  const { userLevel, userSection } = await sqlConnection.userTable.get(req.body.username);
  if(userLevel < adminLevel){
    res.sendStatus(403);
    return;
  }
  if(adminSection !== '001' && userSection !== adminSection){
    res.sendStatus(403);
    return;
  }
  sqlConnection.userTable.remove(req.body.username);
  res.sendStatus(200);
});

app.post(`/${API_VERSION}/account/revise/level`, verifyTokenBy('Header')(20), async (req, res) => { 
  const { adminLevel, adminSection } = await sqlConnection.userTable.get(req.payload.username);
  const { userLevel, userSection } = await sqlConnection.userTable.get(req.body.username);
  if(req.body.newLevel < adminLevel || userLevel < adminLevel){
    res.sendStatus(403);
    return;
  }
  if(adminSection !== '001' && userSection !== adminSection){
    res.sendStatus(403);
    return;
  }
  sqlConnection.userTable.update(req.body.username, 'level', req.body.newLevel);
  res.sendStatus(200);
});

app.post(`/${API_VERSION}/account/revise/section`, verifyTokenBy('Header')(10), async (req, res) => {
  sqlConnection.userTable.update(req.body.username, 'section', req.body.newSection);
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
    const time = (new Date).getTime()
    for (fishID in fishData){
      fishData[fishID].time = time;
      if(!sqlConnection.fishTable[section + fishID]){
        res.sendStatus(403);
        return;
      }
      await sqlConnection.fishTable[section + fishID].insert(fishData[fishID]); //從SQL中更新所求的data
    }
    res.sendStatus(200);
  }
  catch{ res.sendStatus(403); }
})

app.post(`/${API_VERSION}/fish/`, verifyTokenBy('Header')(40),  async (req, res) => {
  try{
    const { fishID } = req.body; //取得參數
    const { section } = req.query;
    if(!fishID||!section){
      res.sendStatus(403);
      return;
    }
    sqlConnection.fishTable.insert({ fishUID: section + fishID });
    res.sendStatus(200);
  }
  catch{res.sendStatus(403);}
})

//此API可取得fish的table，路由參數fish_ids以逗號分隔多個id，例如: /sql/fish_data/IDs=23,24,26，
app.get(`/${API_VERSION}/fish/table/`, verifyTokenBy('Header')(50), async (req, res) => { 
  try{
    const { fishesID, section } = req.query; //取得路由參數
    if(!section || !fishesID){
      res.sendStatus(403);
      return;
    }
    const fish_id_array = fishesID.match(/(\d+)/g); //將路由參數轉為id陣列
    let tables = {};
    tables[section] = {}
    for (const fishID of fish_id_array){
      tables[section][fishID] = await sqlConnection.fishTable[section + fishID].get() //從SQL中取得所求的table
    }
    res.send(tables);
  }
  catch{res.sendStatus(403);}
});

//此API可取得fish的最新data
app.get(`/${API_VERSION}/fish/data/`, verifyTokenBy('Header')(50), async (req, res) => { 
  try{
    const { fishesID, section } = req.query; //取得路由參數
    if(!section || !fishesID){
      res.sendStatus(403);
      return;
    }
    fish_id_array = fishesID.match(/(\d+)/g); //將路由參數轉為id陣列
    let tables = {};
    tables[section] = {}
    for (const fishID of fish_id_array){
      tables[section][fishID] = await sqlConnection.fishTable[section + fishID].get(1) //從SQL中取得所求的table
    }
    res.send(tables);
  }
  catch{res.sendStatus(403);}
});

//此API可取得fish的指定版本data
app.get(`/${API_VERSION}/fish/history_data/`, verifyTokenBy('Header')(50), async (req, res) => { 
  try{
    let { fishesID, section, versions } = req.query; //取得路由參數
    if(!section || !fishesID || !versions){
      res.sendStatus(403);
      return;
    }
    fishesID = fishesID.match(/(\d+)/g); //將路由參數轉為id陣列
    versions = versions.match(/(\d+)/g).map(Number); //將路由參數轉為version陣列
    let tables = {};
    tables[section] = {}
    for (const i in fishesID){
      tables[section][fishesID[i]] = await sqlConnection.fishTable[section + fishesID[i]].get('version', versions[i]) //從SQL中取得所求的table
    }
    res.send(tables) //從SQL中取得所求的data
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
    if(!section || !fishesID){
      res.sendStatus(403);
      return;
    }
    sqlConnection.fishTable.remove(fishesID.map(fishId => section + fishId))
    res.sendStatus(200);
  }
  catch{res.sendStatus(403);}
})


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
  /*mqttConnection.publish(`Fish/video/${sectionProcess.code.decode(section)}/get`,video_uid,()=>{
   
  })*/
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
        const { level, section } = await sqlConnection.userTable.get(payload.username);
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
      sqlConnection.video.insert({
        videoUID: mqtt_data.video_uid,
        time: mqtt_data.time,
        section: sectionProcess.code.encode(topic.split('/')[2]),
        fishID: Object.keys(mqtt_data)[0],
        status: mqtt_data[Object.keys(mqtt_data)[0]]
      });
      sqlConnection.error.insert({
        section: sectionProcess.code.encode(topic.split('/')[2]),
        fishID: Object.keys(mqtt_data)[0],
        errorCode: mqtt_data[Object.keys(mqtt_data)[0]],
        time: mqtt_data.time
      })
      mqtt_data.section = topic.split('/')[2];
      lineNotify.send(mqtt_data, decode = lineNotify.decodeFishesAlarm);
    break;
    default :
      delete mqtt_data.time
      const topicInfo = topicDecode(topic);
      for(let fishID in mqtt_data){
        sqlConnection.fishTable[topicInfo.section + fishID].insert(mqtt_data[fishID]); //更新sql資料
      }
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
    else if(! (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(mail))) res.send('電子郵件不合法').status(403)
    else next();
  }
}

