const { prisma } =  require('../../../../modules/util/myPrisma.js') ;
const mqttConnection = require('../../../../modules/util/mqtt');
const franc = import('franc');
const { instruction, chineseKeyword, englishKeyword } = require('../../../../config/voiceKeyword.js')
let lang = 'ch'
function isletter(character) {
  return /^[a-zA-Z]$/.test(character);
}

function recognize(text){
  if(isletter(text[0])) {
    lang = 'eng';
  }
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
    for(word of text){
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
      console.log(req.body);
      const fishUID = '0023011'
      //const section = '002001001';
      const motion = recognize(req.body.text);
      console.log(motion)
      if(motion.length > 4) return res.send('辨識失敗, 找不到合適的指令');
      // const { location: section } = await prisma.fish.findUnique({
      //   where: { fishUID }
      // })
      let section = '002001001';
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