const sql =  require('../my_modules/newSQL');


(async (sql)=>{
    const sqlConnection = await sql();
    await sqlConnection.removeAll();
    await sqlConnection.showAll();
    //sqlConnection.end();
})(sql);