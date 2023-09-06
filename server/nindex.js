const init = require ('./modules/inital');
const routes = require('./routes');
const mqttProcess = require('./modules/mqtt')
const express = require('express');
const app = express();

mqttProcess();
init(app);
app.use('/', routes);

/*
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
});*/
