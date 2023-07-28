const connection = require('./my_modules/sql')();
require("dotenv").config();


(async (connection)=>{
    console.table(await connection.getFishUIDTable())
    await connection.showFishesTable(await connection.getFishesID());
    await connection.showUserTable();
    await connection.showVideoTable();
    console.log(await connection.getVideoTable());
    connection.end();
})(connection);
