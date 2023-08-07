const infoMap = require('./infoMap');
const jsonFile = require('./jsonFile')

module.exports = () => {
    const fishError = jsonFile('./file/fishError.json');
    return{
        code: infoMap(
            ['ntut','nmmst','pmp'],
            ['002','003','004']
        ),
        chinese: infoMap(
            ['ntut','nmmst','pmp'],
            ['北科','海科','先鋒']
        ),
        error: infoMap(
            ['魚關機了', ...Object.values(fishError)],
            [-1, ...Object.keys(fishError).map(Number)]
        )
    }
}

  