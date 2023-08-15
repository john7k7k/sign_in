
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
require("dotenv").config();

module.exports = async function ()
{      
    const connection = {};

    connection.createFishTable = async function () {
        const fishTable = {};
        fishTable.video = {};
        fishTable.error = {};
        for(const { fishUID } of await prisma.fish.findMany()){
            
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

