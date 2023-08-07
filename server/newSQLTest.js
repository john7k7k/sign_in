
(async ()=>{
    const sql =  require('./my_modules/newSQL');
    sqlConnection = await sql()
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
    //await sqlConnection.userTable.remove();
    //await sqlConnection.fishTable.remove(['00223'])
    //await sqlConnection.fishTable['00223'].show()
    await sqlConnection.showAll();
})();