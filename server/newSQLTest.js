const sql =  require('./my_modules/newSQL');
const sqlConnection = sql();

(async (sqlConnection)=>{
    /*await sqlConnection.userTable.insert({
        username: 'jack',
        email: 'ppp1244qqq@gmail.com',
        passcode: 'efrbyjuiktrdnyerth17dyhrd',
        registrationTime: 166269528466,
        level: 20,
        section: '002'
    })*/
    await sqlConnection.fishTable.insert({
        fishUID: '00223'
    })

    await sqlConnection.showAll();
})(sqlConnection);