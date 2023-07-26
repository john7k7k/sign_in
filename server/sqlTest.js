const connection = require('./my_modules/sql')();
require("dotenv").config();


(async (connection)=>{
    await connection.showFishesTable();
    await connection.showUserTable();
    await connection.updateVideo({
        videoUID: 3,
        date: '2020/1/2 15:03:54',
        section: '001',
        fishID: 25,
        status: 2
    })
    await connection.showVideoTable();
    connection.end();
})(connection);
