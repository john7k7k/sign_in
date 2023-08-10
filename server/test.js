
const { DateTime } =  require('luxon')
console.log((DateTime.now()).setZone('Asia/Taipei').toFormat('yyyy/M/d HH:mm:ss'))