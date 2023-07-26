const connection = require('./my_modules/sql')();
require("dotenv").config();


(async (connection)=>{
    await connection.deleteUserTables();
    await connection.deleteVideoTable();
    await connection.deleteFishesTable(await connection.getFishesID());
    await connection.showUserTable();
    await connection.showVideoTable();
    await connection.showFishesTable(await connection.getFishesID());
    connection.end();
})(connection);