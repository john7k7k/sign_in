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
  "R":['右','又','佑','修','幼',''],
  "U":['上','水面','抬','浮','尚','尙'],
  "D":['下', '底','夏','嚇','厦','加'],
  "X":['停','廷','庭','亭','靜','定','子','紫', '仔','紙','紙','致'],
  "M":['平','衡','橫', '凌', '海', '評','你']
}
const englishKeyword = {
  "X":['stop','star','知'],
  "O":['forward', 'howard', 'ward', 'food', 'word', 'world', '狗', '我','卧','尔','否','wood','沃','go'],
  "L":['left', 'let', 'laft', 'last', 'best', 'live', 'plate','life','late'],
  "R":['right', 'rice', 'bright','at','@'],
  "U":['up','on', 'app', 'apple', 'pop','婆'],
  "D":['down','dell','党','但','上', '塟','幹','較','掉','调','到','叫','屌','涨','赵','在','跳','荡','让'],
  "M":['balance','poise', 'ballet', 'alan', 'blanc', 'silence', 'black']
}

module.exports = { instruction, chineseKeyword, englishKeyword }