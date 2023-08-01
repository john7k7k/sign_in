const fetch = require('node-fetch');
require("dotenv").config();

const lineNotifyEndpoint = 'https://notify-api.line.me/api/notify';

module.exports = (accessToken = process.env.DB_LINE_TOKEN) => {
  let lineNotify = {};
  lineNotify.send = (message,sectionInfo = '北科魚池',decode = (mes)=>mes) => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${accessToken}`
    };
  
    const data = new URLSearchParams();
    data.append('message', sectionInfo +':\n' + decode(message));
  
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
  lineNotify.decodeFishesAlarm = (message) => { //解析IOT端
    const date = new Date();
    var data = '(Alarm)\n'
    data += date.toLocaleString();
    data+='\n'+'id: '+Object.keys(message)[0]+', '+'status: '+message[Object.keys(message)[0]]
    return data
  }
  return lineNotify;
}


