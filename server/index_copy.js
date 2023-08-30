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
const { PrismaClient } = require('@prisma/client');
const section = require('./my_modules/section');
const prisma = new PrismaClient();
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
const sub_topic_group = [
  'Fish/info/<poolID>',
  'Fish/alarm/<poolID>'
];

((app) => { //init app, sql
  app.use(express.json())
  app.use(cors())
  app.use(cookieParser())
  app.use("/public", express.static('../public'));
  app.use("/img", express.static('../public/img'));
  app.use("/js", express.static('../public/js/'));
  app.use("/fonts", express.static('../public/fonts/'));
  app.use("/css", express.static('../public/css/'));
  app.use("/index", express.static('../public/'));
  //lineNotify.sendInterval(sqlConnection.getFishesData, lineNotify.decodeAllFishesData, 7200000)
})(app)

//mqtt處理

mqttConnection.on('connect', async () => {
  console.log('已連接到MQTT');
  const pools = await prisma.pool.findMany();
  pools.forEach(({ id }) => {
    sub_topic_group.forEach(sub_topic => {
      mqttConnection.subscribe(sub_topic.replace('<poolID>', `${id.slice(0,3)}/${id.slice(3,6)}/${id.slice(6)}`))
      //console.log(sub_topic.replace('<poolID>', `${id.slice(0,3)}/${id.slice(3,6)}/${id.slice(6)}`))
    })
  })
});

mqttConnection.on('message', async (topic, rec_message) => { //接收到IOT端訊息
  const json_data = JSON.parse(rec_message.toString()); //parse資料
  console.log('主題',topic,', 時間: ',  (new Date()).toLocaleString()); //印出資料
  mqttProcess(topicDecode(topic),json_data);
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

app.get(/^\/(?:login|sign\/up)$/, function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get(/^\/(?:ntut\/fish|nmmst\/fish|ntut\/fish\/edit|nmmst\/fish\/edit|user|home|fish\/list|account\/list)$/, verifyTokenBy('Cookie')(), function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 2. 帳號 API

app.post(`/${API_VERSION}/account/login/`, async function(req, res) {
  console.log(req.body);
  const userTable = await prisma.user.findMany();
  for (let user of userTable) {
    if (req.body.username !== user.username) continue;
    if(md5(req.body.password) !== user.passcode || !user.verify){
      res.sendStatus(403); //密碼錯誤或未驗證
      return;
    }
    jwt.sign(
      { username: req.body.username },
      process.env.DB_JWTKEY,
      {expiresIn: '9000s'},
      async (err, token) => {
        resData  = await prisma.user.findUnique({
          where: {username: req.body.username},
          include: {
            fishAble: { 
              include: { 
                fish: { 
                  include: {
                    fishData: {
                      orderBy: {
                        time: 'desc'
                      },
                      take: 1 
                    }
                  }
                }
              } 
            }
          }
        });
        resData.fishesID = {};
        resData.fishAble.forEach(({fish: {location, fishUID, fishData: [{ active } = {active: 0}]}}) => {
          if(!resData.fishesID[location]) resData.fishesID[location] = {};
          resData.fishesID[location][fishUID] = active;
        })
        delete resData.fishAble;
        delete resData.passcode;
        delete resData.exist;
        delete resData.verify;
        resData.token = token
        res.send(resData)
      }
    )
    return
  }
  res.sendStatus(403); //
  console.log("無帳號")
});

app.get(`/${API_VERSION}/account/verify/`, async (req, res) => {
  try{
    const { username } = req.query;
    console.log(username);
    await prisma.user.update({
      data: {
        verify: 1
      },
      where: {
        username
      }
    })
    res.sendStatus(200)
  }catch{ res.sendStatus(403) }
  
})

app.post(`/${API_VERSION}/account/sign_up/`, verifyUserData(),async function(req, res) {
  const userTable = await prisma.user.findMany();
    for (let user of userTable) {
        if (req.body.username === user.username) {
          res.status(403).send('帳號已存在')
          return;
        }
    }
    await prisma.user.create({
        data:{
            username: req.body.username,
            email: req.body.mail,
            passcode: md5(req.body.password),
            registrationTime: Math.floor((new Date()).getTime()/1000),
            level: req.body.level,
            section: req.body.section,
            exist: 1,
            verify: 0,
            fishAble: {
              create: []
            }
        }
    })
    const mailOption = {
      from: process.env.DB_GMAIL_ACCOUNT,
      to: req.body.mail,
      subject: "aifish.cc 註冊帳號驗證",
      text: `您的帳號'${req.body.username}'需要驗證，請點擊下方連結驗證
      https://${process.env.DOMAIN}/api/v1/account/verify/?username=${req.body.username}`
    }
    transporter.sendMail(mailOption, (error, info) => {
      if (error) console.log(error);
      else console.log("sent" + info.response)
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
})

app.get(`/${API_VERSION}/account/`, verifyTokenBy('Header')(), async (req, res) => { 
  resData  = await prisma.user.findUnique({
    where: {username: req.payload.username},
    include: {
      fishAble: { 
        include: { 
          fish: { 
            include: {
              fishData: {
                orderBy: {
                  time: 'desc'
                },
                take: 1 
              }
            }
          }
        } 
      }
    }
  });
  resData.fishesID = {};
  resData.fishAble.forEach(({fish: {location, fishUID, fishData: [{ active } = {active: 0}]}}) => {
    if(!resData.fishesID[location]) resData.fishesID[location] = {};
    resData.fishesID[location][fishUID] = active;
  })
  delete resData.fishAble;
  delete resData.passcode;
  delete resData.exist;
  delete resData.verify;
  res.send(resData)
});

app.get(`/${API_VERSION}/account/list/`, verifyTokenBy('Header')(20), async (req, res) => { 
  let resData = await prisma.user.findMany();
  if(req.query.section !== '001')
    resData = resData.filter(user => user.section.match('^' + req.query.section));
  for(let userData of resData){
    delete userData.passcode;
  }
  res.send(resData);
});

app.post(`/${API_VERSION}/account/remove_user/`, 
  verifyTokenBy('Header')(20, false), 
  verifyAdmin(), 
  async (req, res) => { 
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
);

app.post(`/${API_VERSION}/account/revise/level/`, 
  verifyTokenBy('Header')(20, false), 
  verifyAdmin(),
  async (req, res) => { 
    await prisma.user.update({
      where: {username: req.body.username},
      data: {level: req.body.newLevel}
    });
    res.sendStatus(200);
  }
);

app.post(`/${API_VERSION}/account/revise/section/`, 
  verifyTokenBy('Header')(10, false), 
  verifyAdmin(), 
  async (req, res) => {
    if(!req.body.newSection.match('^' + req.admin.section) && req.admin.section !== '001'){
      res.sendStatus(403);
      return;
    }
    await prisma.user.update({
      data: {
        section: req.body.newSection
      },
      where: {
        username: req.body.username
      }
    })
    res.sendStatus(200);
  }
)

// 3. Fish API

app.post(`/${API_VERSION}/fish/`, verifyTokenBy('Header')(30), async (req,res) => {
  try{
    const  { fishUID } = req.body;
    await prisma.fish.create({
      data: {
        fishUID,
        exist: 1,
        pool: {
          connect: {
            id: req.query.section
          }
        }
      }
    });
    const users = await prisma.user.findMany();
    const admins = users.filter(user => user.level <= 30 && (req.query.section.match('^' + user.section)||user.section=='001'));
    for (let { userID } of admins)
    await prisma.fishAble.create({
      data: {
        user: {
          connect: {
            userID
          }
        },
        fish: {
          connect:{
            fishUID
          }
        }
      }
    });
    res.sendStatus(200);
  }catch{ res.sendStatus(500); }
})

//此API可新增fish的data
app.post(`/${API_VERSION}/fish/data/`, verifyTokenBy('Header')(40, false),  async (req, res) => {
  try{
    const { fishData } = req.body; //取得參數
    if(!fishData){
      res.sendStatus(403);
      return;
    }
    const fishesUID = Object.keys(fishData);
    await prisma.fishData.createMany({
      data: fishesUID.map(fishUID => ({
        fishUID,
        time: Math.floor((new Date()).getTime()/1000),
        ...(fishData[fishUID])
      })) 
    })
    res.sendStatus(200);
  }catch{res.sendStatus(500);}
})

//此API可取得fish的table，路由參數fish_ids以逗號分隔多個id，例如: /sql/fish_data/IDs=23,24,26，
app.get(`/${API_VERSION}/fish/table/`, verifyTokenBy('Header')(50, false), async (req, res) => { 
  try{
    let { fishesUID } = req.query; //取得路由參數
    fishesUID = fishesUID.match(/(\d+)/g) //將路由參數轉為id陣列
    const fishes = await prisma.fish.findMany({
      where: {fishUID: {in: fishesUID}},
      include: { fishData: true }
    })
    let tables = {};
    fishes.forEach(fish => {
      if(!tables[fish.location]) tables[fish.location] = {};
      fish.fishData.forEach(data => delete data.fishUID);
      tables[fish.location][fish.fishUID] = fish.fishData;
    })
    res.send(tables);
  }catch{res.sendStatus(500);}
});

app.post(`/${API_VERSION}/fish/assign/`, 
  verifyTokenBy('Header')(20, false), 
  verifyAdmin(), 
  async (req, res) => {
    try{
      const { username, fishUID } = req.body;
      const { userID, section } = await prisma.user.findUnique({ where: { username } });
      const { location } = await prisma.fish.findUnique({ where: { fishUID }});
      if(!location.match('^' + section)){
        res.sendStatus(403);
        return;
      }
      await prisma.fishAble.create({
        data: {
          user: {
            connect: {
              userID
            }
          },
          fish: {
            connect:{
              fishUID
            }
          }
        }
      });
      res.sendStatus(200);
    }catch{res.sendStatus(403)}
  }
)

//此API可取得fish的最新data
app.get(`/${API_VERSION}/fish/data/`, verifyTokenBy('Header')(50, false), async (req, res) => { 
  try{
    let { fishesUID } = req.query; //取得路由參數
    fishesUID = fishesUID.match(/(\d+)/g) //將路由參數轉為id陣列
    const fishes = await prisma.fish.findMany({
      where: {fishUID: {in: fishesUID}},
      include: { 
        fishData: {
          take: 1,
          orderBy: { dataID: 'desc' }
        }
      }
    })
    let datas = {};
    fishes.forEach(fish => {
      if(!datas[fish.location]) datas[fish.location] = {};
      fish.fishData.forEach(data => delete data.fishUID);
      datas[fish.location][fish.fishUID] = fish.fishData[0];
    })
    res.send(datas);
  }catch{res.sendStatus(500);}
});

//此API可取得fish的指定版本data
app.get(`/${API_VERSION}/fish/history_data/`, verifyTokenBy('Header')(50, false), async (req, res) => { 
  try{
    let { fishesUID, versions } = req.query; //取得路由參數
    fishesUID = fishesUID.match(/(\d+)/g); //將路由參數轉為id陣列
    versions = versions.split(','); //將路由參數轉為version陣列
    const fishes = await prisma.fish.findMany({
      where: {
        fishUID: {
          in: fishesUID,
        }
      },
      include: {
        fishData: {
          where: {
            OR: versions.map((version,index) => ({
              fishUID: fishesUID[index],
              time:{
                gte: Number(version.split(':')[0]),
                lte: Number(version.split(':')[1])
              }
            }))
          },
          orderBy: {
            time: 'asc'
          }
        }
      }
    }) 
    console.log(fishes)
    let datas = {};
    fishes.forEach(fish => {
      if(!datas[fish.location]) datas[fish.location] = {};
      fish.fishData.forEach(data => delete data.fishUID);
      datas[fish.location][fish.fishUID] = fish.fishData;
    })
    res.send(datas);
  }catch{res.sendStatus(403);}
});

//此API可控制fish (LED,action,mode)
app.post(`/${API_VERSION}/fish/control/`, verifyTokenBy('Header')(60), async (req, res) => {
  try{
    const { fishControl } = req.body; //取得參數
    const { section } = req.query;
    for(key in fishControl){
      const fish_string = JSON.stringify(fishControl[key]); //轉換為json字串
      mqttConnection.publish('Fish/control/' +  section.slice(0,3) + '/' + section.slice(3,6) + '/' +section.slice(6) + '/'  + key,fish_string);
      console.log('Fish/control/' + section.slice(0,3) + '/' + section.slice(3,6) + '/' +section.slice(6) + '/'  + key);
    }
    res.sendStatus(200);
  }
  catch{res.sendStatus(403);}
})

app.post(`/${API_VERSION}/fish/delete/`, verifyTokenBy('Header')(30, false),  async (req, res) => {
  try{
    const { fishesUID } = req.body; //取得參數
    console.log(fishesUID)
    if(!section || !checkAllFishExist(fishesUID)){
      res.sendStatus(403);
      return;
    }
    await prisma.fish.deleteMany({
      where: {
        fishUID: {in: fishesUID}
      }
    })
    res.sendStatus(200);
  }catch{res.sendStatus(500);}
})

app.post(`/${API_VERSION}/fish/disassign/`, 
  verifyTokenBy('Header')(20, false), 
  verifyAdmin(),
  async (req, res) => {
    try{
      const { username, fishUID } = req.body;
      const { userID, section } = await prisma.user.findUnique({ where: { username } });
      const { location } = await prisma.fish.findUnique({ where: { fishUID }});
      if(!location.match('^' + section)){
        res.sendStatus(403);
        return;
      }
      await prisma.fishAble.delete({
        where: {
          userID_fishUID: {
            userID, fishUID
          }
        }
      });
      res.sendStatus(200);
    }catch{res.sendStatus(500)}
  }
)

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

//4. 區域
app.post(`/${API_VERSION}/pool/`, async (req, res) => {
 // try{
    const { instruction, depart, pool } = req.body;
    await prisma.pool.create({
      data: {
        id: instruction.code + depart.code + pool.code,
        name: pool.name,
        depart: {
          connect: {
            id: instruction.code + depart.code
          }
        }
      }
    })
    res.sendStatus(200);
//}catch{ res.sendStatus(500); }
})

app.post(`/${API_VERSION}/depart/`, async (req, res) => {
  try{
    const { instruction, depart } = req.body;
    await prisma.depart.create({
      data: {
        id: instruction.code + depart.code,
        name: depart.name,
        instruction: {
          connect: {
            id: instruction.id
          }
        }
      }
    })
    res.sendStatus(200);
  }catch{ res.sendStatus(403) }
})

app.post(`/${API_VERSION}/instruction/`, async (req, res) => {
  try{
    const { instruction } = req.body;
    await prisma.instruction.create({
      data: {
        id: instruction.code,
        name: instruction.name
      }
    })
    res.sendStatus(200);
  }catch{ res.sendStatus(403) }
})

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

function verifyTokenBy(tokenFrom = 'URL'){
  return (threshold = 0, verifySection = true) => {
    return (req, res, next) => {
      let token = '';
      try{
        if(tokenFrom === 'URL') token = req.query.token;
        else if(tokenFrom === 'Header') token = req.headers['authorization'].split(' ')[1];
        else if(tokenFrom === 'Cookie') token = req.cookies.token;
      }
      catch{
        res.sendStatus(403);
        return;
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
        const { level, section } = await prisma.user.findUnique({
          where: {
            username: payload.username
          }
        });
        if(level > threshold) res.sendStatus(403);
        else if(verifySection && !req.query.section.match('^'+section) && section !== '001') res.sendStatus(403);
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
    instruction: topicArray[2],
    depart: topicArray[3],
    pool: topicArray[4],
    command: topicArray[5]
  }
}

async function mqttProcess(topic,mqtt_data){
  if(topic.type === 'alarm'){
  /*
    const video_data = {
      videoUID: mqtt_data.video_uid,
      time: mqtt_data.time,
      section: sectionProcess.code.encode(topic.split('/')[2]),
      fishID: Object.keys(mqtt_data)[0],
      status: mqtt_data[Object.keys(mqtt_data)[0]]
    }*/
    const { name: instruction, depart: [{name: depart, pool: [{name: pool}]}] } = 
    await prisma.instruction.findUnique({ 
      where: { id: topic.instruction },
      include: {
        depart: {
          where: { id: topic.instruction + topic.depart },
          include: {
            pool: { where: { id: topic.instruction + topic.depart + topic.pool } }
          }
        }
      }
    })
    mqtt_data.poolID = topic.instruction + topic.depart + topic.pool;
    mqtt_data.instruction = instruction;
    mqtt_data.depart = depart;
    mqtt_data.pool = pool;
    lineNotify.send(mqtt_data, decode = lineNotify.decodeFishesAlarm, test = true);
  }
  else if(topic.type === 'info'){
    delete mqtt_data.time;
    console.log(mqtt_data)
    await prisma.fishData.createMany({
      data: Object.keys(mqtt_data).map(fishUID => ({
        fishUID: '002' + fishUID,
        time: Math.floor((new Date()).getTime()/1000),
        ...(mqtt_data[fishUID])
      }))
    })
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


async function checkAllFishExist(fishesUID) {
  const existingFishes = await prisma.fish.findMany({
    where: {
      fishUID: {
        in: fishesUID,
      },
    },
    select: {
      fishUID: true,
    },
  });

  const existingFishesUID = existingFishes.map(({fishUID}) => fishUID);
  const nonExistingFishesUID = fishesUID.filter(fishUID => !existingFishesUID.includes(fishUID));
  return nonExistingFishesUID.length === 0; 
}

function verifyAdmin(){
  return async (req, res, next) => {
    try{
      req.admin = await prisma.user.findUnique({
        where: {username: req.payload.username},
      });
      const { level: adminLevel, section: adminSection } = req.admin;
      const { level: userLevel, section: userSection, email: userEmail } = await prisma.user.findUnique({
        where: {username: req.body.username},
      });
      if(adminSection !== '001' && !userSection.match('^'+adminSection)){
        res.sendStatus(403);
        return;
      }
      if(req.body.newLevel < adminLevel || userLevel < adminLevel){
        res.sendStatus(403);
        return;
      }
      req.user = {};
      req.user.email = userEmail;
      next();
    }catch{res.sendStatus(500);}
  }
}