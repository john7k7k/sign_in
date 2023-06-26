const connection = require('./sql')();
(async (connection)=>{
    //await connection.deleteFishesTable(['23','24','25'])
    await connection.buildFishesTable(['23','24','25'])
    await connection.updateFishesData({
        '23':{'time': 1,'bc': 43, 'err': 6, 'active': 1},
        '24':{'time': 6,'bc': 45, 'err': 7, 'active': 1},
        '25':{'time': 7,'bc': 48, 'err': 7, 'active': 1}
    })
    await connection.showFishesTable()
    //await connection.deleteFishesTable(['23','24','25'])
    //await connection.showFishesTable()
    connection.end();
})(connection);

