const fetch = require('node-fetch');
const sectionProcess = require('./section')();
const { DateTime } =  require('luxon')
require("dotenv").config();

const lineNotifyEndpoint = 'https://notify-api.line.me/api/notify';

module.exports = (accessToken = process.env.DB_LINE_TOKEN) => {
  let lineNotify = {};
  lineNotify.send = (message, decode = (mes)=>mes) => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${accessToken}`
    };
  
    const data = new URLSearchParams();
    data.append('message', decode(message));
    return fetch(lineNotifyEndpoint, {
      method: 'POST',
      headers,
      body: data
    }).then((res) => {
      if(res == 200)
      console.log('Line Notify message sent successfully');
    })
    .catch((error) => {
      console.error('Error sending Line Notify message:', error);
    });
  }

  lineNotify.decodeFishesInfo = (message) => { //解析IOT端
    const date = new Date();
    var data = '(Info)\n'
    data += date.toLocaleString();
    for(i in message){
      data+='\n'+'id: '+i+', '+'bc: '+message[i]['bc']+', '+'err: '+message[i]['err']+', '+'active: '+message[i]['active'];
    }
    return data
  }

  lineNotify.decodeAllFishesData = (message) => { //解析sql端
    const date = new Date();
    var data = '標題: 最新魚資料\n'
    data += `時間: ${(DateTime.now()).setZone('Asia/Taipei').toFormat('yyyy/M/d HH:mm:ss')} (GMT+0800)\n`;
    for(section in message){
      data += `區域: ${sectionProcess.chinese.encode(sectionProcess.code.decode(section))} \n`
      for(fishID in message[section])
        data += `id: ${fishID}`
        for(infoName in message[section][fishID])
          data += ` ,${infoName}: ${message[section][fishID][infoName]}`
        data += '\n'
    }
    return data
  }

  lineNotify.decodeFishesAlarm = (message) => { //解析IOT端
    return `
      標題: 錯誤警報
      區域: ${sectionProcess.chinese.encode(message.section)}
      魚ID: ${Object.keys(message)[0]}
      時間: ${(DateTime.now()).setZone('Asia/Taipei').toFormat('yyyy/M/d HH:mm:ss')} (GMT+0800)
      錯誤內容: ${sectionProcess.error.decode(Object.values(message)[0])}`
  }
  lineNotify.sendInterval = async (getMessage, decode = (mes)=>mes, interval = 10) => {
    lineNotify.send(await getMessage(), decode)
    setTimeout(()=>{
      lineNotify.sendInterval(getMessage, decode, interval);
    }, interval)
  }
  return lineNotify;
}


