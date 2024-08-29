const instruction = {
    "X":["停止", 'stop'],
    "O":["前進", 'forward'],
    "L":["左轉", 'turn left'],
    "R":["右轉", 'turn right'],
    "U":["往上", 'up'],
    "D":["往下", 'down'],
    "M":["平衡", 'balance']
}

const chineseKeyword = {
  "O":['前', '進', '走','田','恬','天'],
  "L":['左','佐','都','周'],
  "R":['右','又','佑','修','幼','柚'],
  "U":['上','水面','抬','浮','尚','尙','站'],
  "D":['下', '底','夏','嚇','厦','加'],
  "X":['停','廷','庭','亭','靜','定','紫', '仔','紙','紙','致'],
  "M":['平','衡','橫', '凌', '海', '評','你']
}
const englishKeyword = {
  "X":['stop','star','set'],
  "O":['forward', 'howard', 'ward', 'food', 'word', 'world','wilson','wood',' worth','go','full','water','cold','call','for','what','bored'],
  "L":['left', 'let', 'laft', 'last', 'best', 'live', 'plate','life','late','next','laugh','lex','lanter','later'],
  "R":['right', 'rice', 'bright','@','rise','light','writer'],
  "U":['up', 'app', 'apple', 'pop','opera'],
  "D":['down','tong','dumb','done','dou','no','dial','tell','de','song'],
  "M":['balance','poise', 'ballet', 'alan', 'blanc', 'silence', 'black','paris','pay','bad','palace']
}

module.exports = { instruction, chineseKeyword, englishKeyword }