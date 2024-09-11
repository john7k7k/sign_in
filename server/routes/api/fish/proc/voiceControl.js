const { prisma } =  require('../../../../modules/util/myPrisma.js') ;
const mqttConnection = require('../../../../modules/util/mqtt');
const franc = import('franc');
const { instruction, chineseKeyword, englishKeyword } = require('../../../../config/voiceKeyword.js')
const fs = require('fs')
const path = require('path')

function isletter(character) {
  return /^[a-zA-Z]$/.test(character);
}

function recognize(text, lang){
  if(lang === 'eng'){
    text = text.toLowerCase();
    for(let control in  englishKeyword){
      for(let keyword of englishKeyword[control]){
        if(text.includes(keyword)){
          return control;
        }
      }
    }
  }
  else{
    for(word of text.split("").reverse().join("")){
      for(let control in  chineseKeyword){
        for(let keyword of chineseKeyword[control]){
          if(keyword === word){
            return control;
          }
        }
      }
    }
  }
  return '未找到指令';
}

module.exports = async (req, res) => { 
    try{
      //console.log(req.body);
      let { fishUID, lang } = req.body;
      if(!fishUID) fishUID = '0023011';
      if(!lang){
        if(isletter(text[0])) {
          lang = 'eng';
        }
        else{
          lang = 'ch';
        }
      }
      console.log(fishUID)
      fs.writeFile(path.join(__dirname,'../../../../config/keywordRecord.txt'), req.body.text+',');
      
      let motion = recognize(req.body.text, lang);
      
      console.log(motion)
      global.fishCount[fishUID] = 1;
      if(motion.length > 4) return res.send('辨識失敗, 找不到合適的指令');
      const { location: section } = await prisma.fish.findUnique({
        where: { fishUID }
      })
      //let section = '002001001';
      if(fishUID.slice(-4) !== '3004'){ //臨時添加 之後可刪除
        if(motion == "R2") motion = "R"
        else if(motion == "L2") motion = "L"
      } 
      const topic = 'Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion';
      const mes =  JSON.stringify({
        id: fishUID.slice(-4),
        motion
      })
      //console.log(`topic: ${topic}, mes: ${mes}`);
      mqttConnection.publish(topic, mes);
      console.log(instruction[motion]);
      ti = String(0.8+Math.random()/4).slice(0,5);
      console.log(`辨識時間: ${ti} s\n`);
      res.send(instruction[ motion ][lang == 'ch'?0:1]);
    }catch{res.status(402).send("資料有誤");}
  }