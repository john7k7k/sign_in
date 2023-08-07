const jsonFile = require('./my_modules/jsonFile');
(async ()=>{
    const fishError = jsonFile('./file/fishError.json')
    console.log(Object.keys(fishError).map(Number))
})()
