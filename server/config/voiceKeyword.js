const instruction = {
    "X":["停止", 'stop'],
    "O":["前進", 'forward'],
    "L":["左轉", 'turn left'],
    "R":["右轉", 'turn right'],
    "L3":["左轉", 'turn left'],
    "R3":["右轉", 'turn right'],
    "U":["往上", 'up'],
    "D":["往下", 'down'],
    "M":["平衡", 'balance'],
    "G":["轉圈", 'circle'],
    "l":["迴轉", 'u-turn']
}

const chineseKeyword = {
  "O":['前', '進', '走','田','恬','天','千'],
  "L3":['左','佐','都','周','卓','茁'],
  "R3":['右','又','佑','修','幼','柚'],
  "U":['上','水面','抬','浮','尚','尙','站'],
  "D":['下', '底','夏','嚇','厦','加'],
  "X":['停','廷','庭','亭','靜','定','紫', '仔','紙','紙','致'],
  "M":['平','衡','橫', '凌', '海', '評','你'],
  "G":['圈'],
  "l":["迴",'回']
}
const englishKeyword = {
  "X":['stop','star','set'],
  "O":['forward', 'howard', 'ward', 'food', 'word', 'world','wilson','wood',' worth','go','full','water','cold','call','for','what','bored'],
  "L3":['left', 'let', 'laft', 'last', 'best', 'live', 'plate','life','late','next','laugh','lex','lanter','later'],
  "R3":['right', 'rice', 'bright','@','rise','light','writer'],
  "U":['up', 'app', 'apple', 'pop','opera','copper'],
  "D":['down','tong','dumb','done','dou','no','dial','tell','de','song'],
  "M":['balance','poise', 'ballet', 'alan', 'blanc', 'silence', 'black','paris','pay','bad','palace'],
  "G":['circle', 'rotate', 'rotion'],
  "l":["around", "u-turn", "turn"]
}

module.exports = { instruction, chineseKeyword, englishKeyword }