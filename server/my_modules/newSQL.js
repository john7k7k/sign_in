const { createConnection } = require('mysql');
require("dotenv").config();

module.exports = async function (sql_data = {
    host: process.env.DB_SQL_HOST,
    port: process.env.DB_SQL_PORT,
    user: process.env.DB_SQL_USER,
    password: process.env.DB_SQL_PASSWORD,
    database: process.env.DB_SQL_DATABASE
})
{      
    const connection = createConnection(sql_data);
    connection.connect((err)=>{
        if(err) throw err
        console.log("connected sql")
    })

    connection.createTable = async function (tableName, columns) {
        init();
        function init(){
            let createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName}(`
            Object.keys(columns).forEach((columnName, index) => {
                const columnType = columns[columnName];
                createTableQuery += `${columnName} ${columnType},`
            });
            createTableQuery = createTableQuery.slice(0,-1);
            createTableQuery += ')';
            connection.query(createTableQuery, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        };
        return {
            async get(key,conditions){
                return new Promise(async (reslove, reject)=>{
                    init();
                    let query = `SELECT * FROM ${tableName}`;
                    if(conditions === undefined){
                        connection.query(query, (err, result) => {
                            if (err) reject(err);
                            else {
                                reslove(result)
                            }
                        });
                    }
                    else{
                        query += ` WHERE`;
                        for (let condition of conditions){
                            query += ` ${key} = ? OR`;
                        }
                        query = query.slice(0,-2);
                        connection.query(query, conditions, (err, result) => {
                            if (err) reject(err);
                            else {
                                reslove(result)
                            }
                        });
                    }
                })
            },
            async insert(data){
                return new Promise((reslove, reject)=>{
                    connection.query(`INSERT INTO ${tableName} SET ?`, data, (err, result) => {
                        if (err) reject(err);
                        else {
                            reslove(result)
                        }
                    });
                })
            },
            async remove(key,conditions){
                return new Promise(async (reslove, reject)=>{
                    let deleteQuery = `DROP TABLE IF EXISTS ${tableName}`;
                    if (conditions === undefined){
                        connection.query(deleteQuery, (err, result) => {
                            if (err) throw err;
                        });
                    }
                    else {
                        deleteQuery = `DELETE FROM ${tableName} WHERE`;
                        for (let condition of conditions){
                            deleteQuery += ` ${key} = ? OR`;
                        }
                        deleteQuery = deleteQuery.slice(0,-2);
                        connection.query(deleteQuery, conditions, (err, result) => {
                            if (err) throw err;
                        });
                    }
                    reslove();
                })
            },
            async show(key, conditions, showMethod = console.table){
                return new Promise(async (reslove, reject)=>{
                    showMethod(tableName);
                    reslove(showMethod(await this.get(key, conditions)));
                })
            },
            async update(data){
                return new Promise((reslove, reject)=>{
                    const query = `INSERT INTO ${tableName} SET ? ON DUPLICATE KEY UPDATE ?`;
                    connection.query(query, [data, data], (err, results) => {
                    if (err) {
                        console.error('資料新增或更新失敗：', err);
                        reslove();
                    }
                
                    if (results.affectedRows > 0) {
                        console.log('資料新增或更新成功');
                    } else {
                        console.log('無資料變更');
                    }
                    });
                    reslove();
                })
            }
        }
    }
    connection.createFishTable = async function () {
        const fishTable = await connection.createTable('FISH', {
            num: 'INT AUTO_INCREMENT PRIMARY KEY',
            fishUID: 'VARCHAR(10)'
        });
        fishTable.video =  await connection.createTable('VIDEO', {
            videoUID: 'INT PRIMARY KEY',
            time: 'BIGINT',
            section: 'VARCHAR(10)',
            fishID: 'INT',
            status: 'INT'
        });
        fishTable.error = await connection.createTable('ERROR',{
            errorID: 'INT AUTO_INCREMENT PRIMARY KEY',
            fishUID: 'VARCHAR(10)',
            errorCode: 'INT',
            time: 'BIGINT'
        })
        fishTable.fishesUID = [];
        for(const { fishUID } of await fishTable.get()){
            fishTable.fishesUID.push(fishUID)
            fishTable[fishUID] = await connection.createTable(tableName = 'FISH' + fishUID, columns = {
                version: 'INT AUTO_INCREMENT PRIMARY KEY',
                time: 'BIGINT',
                bc: 'INT',
                err: 'INT',
                active: 'INT'
            });
        }

        const { insert, remove, show } = fishTable;
        fishTable.insert = async function(data){
            for(const {fishUID} of await connection.fishTable.get()){
                if(fishUID === data.fishUID){
                   return;
                }
            }
            await insert.call(this, data);
            connection.fishTable[data.fishUID] = await connection.createTable(tableName = 'FISH' + data.fishUID, columns = {
                version: 'INT AUTO_INCREMENT PRIMARY KEY',
                time: 'BIGINT',
                bc: 'INT',
                err: 'INT',
                active: 'INT'
            });
        }
        fishTable.remove = async function(fishesUID){
            return new Promise(async (reslove, reject)=>{
                await remove.call(this, 'fishUID', fishesUID);
                for(const { fishUID } of await fishTable.get('fishUID', fishesUID)){
                    connection.query(`DROP TABLE IF EXISTS FISH${fishUID}`, (err, result) => {
                        if (err) reject(err);
                    });
                }
                reslove()
            })   
        }
        fishTable.showDetail = async function(fishesUID, dataKey = 'version', conditions){
            await show.call(this, 'fishUID', fishesUID);
            fishTable.error.show('fishUID', conditions = fishesUID);
            fishTable.video.show('fishUID', conditions = fishesUID);
            if(fishesUID === undefined) fishesUID = fishTable.fishesUID;
            for (let fishUID of fishesUID){
                await fishTable[fishUID].show(dataKey, conditions);
            }
        }

        return fishTable;
    }
    connection.showAll = async function (showMethod = console.table){
        await connection.userTable.show(showMethod = showMethod);
        await connection.fishTable.showDetail(showMethod = showMethod);
    }

    connection.userTable = await connection.createTable('USER', {
        userID: 'INT AUTO_INCREMENT PRIMARY KEY',
        username: 'VARCHAR(255)',
        email: 'VARCHAR(255)',
        passcode: 'VARCHAR(255)',
        registrationTime: 'BIGINT',
        level: 'INT',
        section: 'VARCHAR(3)'
    });
    connection.fishTable = await connection.createFishTable();

    return connection
}