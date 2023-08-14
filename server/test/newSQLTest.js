const sql =  require('../my_modules/newSQL');

(async (sql)=>{
    const sqlConnection = await sql();/*
    await sqlConnection.userTable.insert({
        username: 'jack',
        email: 'ppp1244qqq@gmail.com',
        passcode: 'efrbyjuiktrdnyerth17dyhrd',
        registrationTime: 166269528466,
        level: 20,
        section: '001'
    })/*
    await sqlConnection.fishTable.insert({
        fishUID: '00223'
    })*/
    /*
    await sqlConnection.fishTable['00223'].insert({
        time: 16127475855,
        bc: 10,
        err: 2,
        active: 0
    })*/
  
    await sqlConnection.showAll();
    //console.table(await sqlConnection.fishTable['00223'].get(2));
    //console.log(await sqlConnection.fishTable.getFishesStatus('active'));
    //await sqlConnection.userTable.show()
    //console.log(await sqlConnection.userTable.get('002',key = 'section'))
})(sql);