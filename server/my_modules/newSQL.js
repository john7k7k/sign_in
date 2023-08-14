

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

    connection.createTable = function (tableName, columns) {
        let primaryKey = '';
        init();
        function init(){
            let createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName}(`
            Object.keys(columns).forEach((columnName, index) => {
                const columnType = columns[columnName];
                createTableQuery += `${columnName} ${columnType},`
                if(columnType.includes('AUTO_INCREMENT PRIMARY KEY')) primaryKey = columnName;
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
                    const checkTable = `SHOW TABLES LIKE ?`;
                    connection.query(checkTable, [tableName], (error, results) => {
                        if (error) {
                            reject(err);
                            return;
                        }
                        const tableExists = results.length > 0;
                        if(!tableExists){
                            reslove(`Table ${tableName} not exist`);
                            return;
                        }
                        
                        if(typeof key === 'number'){
                            let query = `SELECT * FROM (SELECT * FROM ${tableName} ORDER BY ${primaryKey} DESC LIMIT ?) AS subquery ORDER BY ${primaryKey} ASC`;
                            connection.query(query, [key], (err, result) => {
                                if (err) reject(err);
                                else {
                                    if(result.length === 1) reslove(result[0]);
                                    else reslove(result);
                                }
                            });
                            return;
                        }
                        let query = `SELECT * FROM ${tableName}`;
                        if(conditions === undefined){
                            connection.query(query, (err, result) => {
                                if (err) reject(err);
                                else {
                                    reslove(result);
                                }
                            });
                        }
                        else{
                            query += ` WHERE`;
                            if(Array.isArray(conditions))
                                for (let condition of conditions){
                                    query += ` ${key} = ? OR`;
                                }
                            else query += ` ${key} = ? OR`;
                            query = query.slice(0,-2);
                            connection.query(query, conditions, (err, result) => {
                                if (err) reject(err);
                                else {
                                    reslove(result)
                                }
                            });
                        }
                    })
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
                        if(Array.isArray(conditions))
                            for (let condition of conditions){
                                deleteQuery += ` ${key} = ? OR`;
                            }
                        else deleteQuery += ` ${key} = ? OR`
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
            async update(key, condition, column, new_value){
                return new Promise((reslove, reject)=>{
                    connection.query(`UPDATE ${tableName} SET ${column} = ? WHERE ${key} = ?`, [new_value, condition], (err, result) => {
                        if (err) reject(err);
                        else {
                            reslove(result)
                        }
                    });
                })
            }
        }
    }
    connection.createFishTable = async function () {
        const fishTable = connection.createTable('FISH', {
            num: 'INT AUTO_INCREMENT PRIMARY KEY',
            fishUID: 'VARCHAR(10)',
        });
        fishTable.video = await connection.createTable('VIDEO', {
            videoUID: 'INT PRIMARY KEY',
            time: 'BIGINT',
            section: 'VARCHAR(10)',
            fishID: 'INT',
            status: 'INT'
        });
        fishTable.error = await connection.createTable('ERROR',{
            errorID: 'INT AUTO_INCREMENT PRIMARY KEY',
            time: 'BIGINT',
            section: 'VARCHAR(10)',
            errorCode: 'INT',
            time: 'BIGINT'
        });
        for(const { fishUID } of await fishTable.get()){
            fishTable[fishUID] = connection.createTable('FISH' + fishUID, columns = {
                version: 'INT AUTO_INCREMENT PRIMARY KEY',
                time: 'BIGINT',
                bc: 'INT',
                err: 'INT',
                active: 'INT'
            });
        }
        const { insert, remove, show } = fishTable;
        fishTable.insert = async function(data){
            for(const {fishUID} of await fishTable.get()){
                if(fishUID === data.fishUID){
                    return;
                }
            }
            await insert.call(this, data);
            connection.fishTable[data.fishUID] = await connection.createTable('FISH' + data.fishUID, columns = {
                version: 'INT AUTO_INCREMENT PRIMARY KEY',
                time: 'BIGINT',
                bc: 'INT',
                err: 'INT',
                active: 'INT'
            });
        }
        fishTable.remove = async function(fishesUID){
            return new Promise(async (reslove, reject)=>{
                await fishTable.get('fishUID', fishesUID);
                for(const { fishUID } of await fishTable.get('fishUID', fishesUID)){
                    connection.query(`DROP TABLE IF EXISTS FISH${fishUID}`, (err, result) => {
                        if (err) reject(err);
                    });
                }
                fishTable.error.remove();
                fishTable.video.remove();
                await remove.call(this, 'fishUID', fishesUID);
                reslove()
            })   
        }
        fishTable.showDetail = async function(fishesUID, dataKey = 'version', conditions){
            await show.call(this, 'fishUID', fishesUID);
            await fishTable.error.show('fishUID', conditions = fishesUID);
            await fishTable.video.show('fishUID', conditions = fishesUID);
            if(fishesUID === undefined) fishesUID = await fishTable.get();
            for (let {fishUID} of await fishesUID){
                if(fishTable[fishUID] === undefined) break;
                await fishTable[fishUID].show(dataKey, conditions);
            }
        }
        fishTable.getFishesUID = async function(){
            return (await fishTable.get()).map(({fishUID}) => fishUID);
        }
        fishTable.getStatus = async function(status, fishesUID){
            const resData = {};
            if(!fishesUID) fishesUID = await fishTable.getFishesUID();
            for (const fishUID of fishesUID){
                const section = fishUID.slice(0,3)
                const fishID = fishUID.slice(3)
                if (!resData[section]) resData[section] = {};
                resData[section][fishID] = (await fishTable[fishUID].get(1))[status];
            }
            return resData;
        }

        return fishTable;
    }

    connection.createUserTable = async function() {
        userTable = connection.createTable('USER', {
            userID: 'INT AUTO_INCREMENT PRIMARY KEY',
            username: 'VARCHAR(255)',
            email: 'VARCHAR(255)',
            passcode: 'VARCHAR(255)',
            registrationTime: 'BIGINT',
            level: 'INT',
            section: 'VARCHAR(15)'
        });
        const { get,update,remove,show } = userTable;
        userTable.get = async function(conditions, key = 'username'){
            if(key === 'username' && conditions && !Array.isArray(conditions))  return (await get.call(this,key,conditions))[0];
            return get.call(this,key,conditions)
        }
        userTable.update = async function(conditions,column,new_value, key = 'username'){
            return update.call(this,key,conditions,column,new_value)
        }
        userTable.remove = async function(conditions, key = 'username'){
            return remove.call(this,key,conditions)
        }
        userTable.show = async function(conditions, key = 'username', showMethod = console.table){
            return new Promise(async (reslove, reject)=>{
                showMethod('USER');
                reslove(showMethod(await this.get(conditions,key)));
            })
        }
        return userTable;
    }
    
    connection.userTable = await connection.createUserTable();
    connection.fishTable = await connection.createFishTable();

    connection.showAll = async function (){
        await connection.userTable.show();
        await connection.fishTable.showDetail();
    }
    
    connection.removeAll = async function (){
        await connection.userTable.remove();
        await connection.fishTable.remove();
    }

    return connection;
}



/**
 * 
 * @param {*} sql_data
 * 
 *   @function createTable
 *      @param {string} tableName
 *      @param {*} columns - {(columnName:  columnType <string>)...}
 * 
 *   @function createTable
 * 
 *   @member {createTable()} fishTable 

 *      @method get
 *          @param {string} key
 *          @param {Array} conditions - [condition <string|number> ... ]
 *      @method insert
 *          @param {*} data - {(columnName:  columnValue <string|number>)...}
 *      @method remove
 *      @method show
 *      @method update
 *      @method showDetail
 * 
 *   @member {createFishTable()} userTable 
 *      @member {*} fishTable
 *      @member {*} video
 *      @member {*} error
 *      @member {Array} fishesUID
 *      @method get
 *      @method insert
 *      @method remove
 *      @method show
 *      @method update
 *      @method showDetail
 * 
 *   @method showAll
 *      @param {function} [showMethod = console.table]
*/

