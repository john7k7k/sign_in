const connection = require('./my_modules/sql')();
require("dotenv").config();


(async (connection)=>{
    await connection.deleteUserTables();
    await connection.deleteFishesTable(await connection.getFishesID());
    await connection.showUserTable();
    await connection.showFishesTable(await connection.getFishesID());
    connection.end();
})(connection);