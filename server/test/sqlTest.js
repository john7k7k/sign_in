const connection = require('../my_modules/sql')();
require("dotenv").config();

(async (connection)=>{
    const args = process.argv.slice(2);
    if(args.includes('fish') || !args.length) console.table(await connection.getFishUIDTable())
    if(args.includes('fishData') || !args.length)await connection.showFishesTable(await connection.getFishesID());
    if(args.includes('user') || !args.length) await connection.showUserTable();
    if(args.includes('video') || !args.length) await connection.showVideoTable();
    connection.end();
})(connection);
