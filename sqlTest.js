const connection = require('./my_modules/sql')();
require("dotenv").config();
/*
(async (connection)=>{
    //await connection.deleteFishesTable(['23','24','25'])
    await connection.buildFishesTable(['23','24','25'])
    await connection.updateFishesData({
        '23':{'time': 1,'bc': 43, 'err': 6, 'active': 1},
        '24':{'time': 6,'bc': 45, 'err': 7, 'active': 1},
        '25':{'time': 7,'bc': 48, 'err': 7, 'active': 1}
    })
    //await connection.showFishesTable()
    //await connection.deleteFishesTable(['23','24','25','2355'])
    await connection.showFishesTable(['24','25'])
    console.log(await connection.getFishesData(['24','25'],versions = [1,3]))
    connection.end();
})(connection);
*/

(async (connection)=>{
    //await connection.deleteFishesTable(['23','24','25','2355'])
    await connection.deleteUseclsrTables();
    //await connection.buildUserTable();
    /*
    await connection.createUser({
        username: 'a',
        level: 2
    });*/
    await connection.showUserTable();
    //await connection.showFishesTable(['23','24','25','2355']);
    connection.end();
})(connection);
