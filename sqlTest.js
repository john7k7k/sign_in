const connection = require('./my_modules/sql')();
require("dotenv").config();


(async (connection)=>{
    await connection.showFishesTable();
    await connection.showUserTable();
    connection.end();
})(connection);
