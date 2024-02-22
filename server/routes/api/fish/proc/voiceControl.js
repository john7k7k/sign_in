const { prisma } =  require('../../../../modules/util/myPrisma.js') ;
const mqttConnection = require('../../../../modules/util/mqtt');
const instruction = {
  "X":"停止",
  "O":"前進",
  "L":"左轉",
  "R":"右轉",
  "U":"往上",
  "D":"往下",
  "M":"平衡"
}
function recognize(text){
  const chineseKeyword = {
    "X":['停','廷','庭','亭','靜','定'],
    "O":['前', '進', '走'],
    "L":['左'],
    "R":['右'],
    "U":['上','水面','抬','浮'],
    "D":['下', '底'],
    "M":['平','衡','橫']
  }
  for(word of text){
    for(let control in  chineseKeyword){
      for(let keyword of chineseKeyword[control]){
        if(keyword === word){
          return control;
        }
      }
    }
  }
  return 'result of ' + text;
}

module.exports = async (req, res) => { 
    try{
      console.log(req.body);
      const fishUID = '0023001';
      const motion = recognize(req.body.text);
      if(motion.length > 4) return res.send('辨識失敗, 找不到合適的指令');
      const { location: section } = await prisma.fish.findUnique({
        where: { fishUID }
      })
      const topic = 'Fish/control/' +  section.slice(0,3) + section.slice(3,6) +section.slice(6) + '/'  + 'motion';
      const mes =  JSON.stringify({
        id: fishUID.slice(-4),
        motion
      })
      console.log(`topic: ${topic}, mes: ${mes}`);
      mqttConnection.publish(topic, mes);
      res.send(instruction[ motion ]);
    }catch{res.status(402).send("資料有誤");}
  }