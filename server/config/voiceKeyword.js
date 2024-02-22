const instruction = {
    "X":"停止",
    "O":"前進",
    "L":"左轉",
    "R":"右轉",
    "U":"往上",
    "D":"往下",
    "M":"平衡"
}

const chineseKeyword = {
  "X":['停','廷','庭','亭','靜','定'],
  "O":['前', '進', '走'],
  "L":['左'],
  "R":['右'],
  "U":['上','水面','抬','浮'],
  "D":['下', '底'],
  "M":['平','衡','橫']
}
const englishKeyword = {
  "X":['stop'],
  "O":['go','forward'],
  "L":['left'],
  "R":['right'],
  "U":['up','on'],
  "D":['down'],
  "M":['balance','poise']
}

module.exports = { instruction, chineseKeyword, englishKeyword }