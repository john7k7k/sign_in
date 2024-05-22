const instruction = {
    "X":["停止", 'stop'],
    "O":["前進", 'go'],
    "L":["左轉", 'turn left'],
    "R":["右轉", 'turn right'],
    "U":["往上", 'up'],
    "D":["往下", 'down'],
    "M":["平衡", 'balance']
}

const chineseKeyword = {
  "X":['停','廷','庭','亭','靜','定'],
  "O":['前', '進', '走'],
  "L":['左','佐'],
  "R":['右','又','佑'],
  "U":['上','水面','抬','浮'],
  "D":['下', '底'],
  "M":['平','衡','橫']
}
const englishKeyword = {
  "X":['stop'],
  "O":['forward'],
  "L":['left'],
  "R":['right'],
  "U":['up','on'],
  "D":['down'],
  "M":['balance','poise']
}

module.exports = { instruction, chineseKeyword, englishKeyword }