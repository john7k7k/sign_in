/**
 * @param {*} sql_data 
 */

const createConnection = require('mysql').createConnection ;
var fishIdArray = [];
var fishIdObject = {};
require("dotenv").config();

module.exports = function(sql_data = {
        host: process.env.DB_SQL_HOST,
        port: process.env.DB_SQL_PORT,
        user: process.env.DB_SQL_USER,
        password: process.env.DB_SQL_PASSWORD,
        database: process.env.DB_SQL_DATABASE
    }){      
    const connection = createConnection(sql_data);
    connection.connect((err)=>{
        if(err) throw err
        console.log("connected sql")
    })
    connection.buildFishUIDTable = async function (){
        return new Promise((reslove, reject)=>{
            const createTableQuery = `CREATE TABLE IF NOT EXISTS FishUID (
                num INT AUTO_INCREMENT PRIMARY KEY,
                fishUID VARCHAR(10)
            )`;
            this.query(createTableQuery, (err, result) => {
                if (err) reject(err);
                else {
                    reslove(result)
                }
            });
        })
    }
    connection.newFishUID = async function (newfishUID){
        return new Promise(async(reslove, reject)=>{
            for(const {fishUID} of await connection.getFishUIDTable()){
                if(fishUID === newfishUID){
                   reslove('fail');
                   return;
                }
            }
            this.query(`INSERT INTO FishUID SET ?`, {fishUID:newfishUID}, (err, result) => {
                if (err) reject(err);
                else {
                    reslove(result)
                    //console.log(`Table(${fish_id}) updated`);
                }
            });
        })
    }
    connection.getFishUIDTable = async function (){
        return new Promise(async (reslove, reject)=>{
            await connection.buildFishUIDTable();
            connection.query(`SELECT * FROM FishUID`, (err, result) => {
                if (err) reject(err);
                else {
                    //console.log(`Table(${fish_id}) get successfully!`);
                    reslove(result)
                }
            });
        })
    }
    connection.getFishUIDArray = async function (){
        return new Promise(async (reslove, reject)=>{
            const UIDArray = [];
            for(uid of await connection.getFishUIDTable()){
                UIDArray.push(uid.fishUID)
            }
            reslove(UIDArray)
        })
    }
    connection.deleteFishUIDTable = async function (){
        return new Promise((reslove, reject)=>{
            this.query(`DROP TABLE IF EXISTS FishUID`, (err, result) => {
                if (err) reject(err);
                else {
                    //console.log(`Table(${fish_id}) deleted`);
                    reslove(result)
                }
            });
        })
    }
    connection.deleteFishUID = async function (fish_UID){
        const deleteQuery = `DELETE FROM FishUID WHERE fishUID = ${fish_UID}`;
        return new Promise((reslove, reject)=>{
            this.query(deleteQuery, (err, result) => {
                if (err) reject(err);
                else {
                    //console.log(`Table(${fish_id}) deleted`);
                    reslove(result)
                }
            });
        })
    }
    connection.deleteFishesUID = async function (fish_UID_array = connection.getFishUIDArray()){
        return new Promise((reslove, reject)=>{
            for(fish_UID of fish_UID_array)
                connection.deleteFishUID(fish_UID);
            reslove()
        })
    }
    connection.getFishesID = async function (){
        return new Promise(async (reslove, reject)=>{
            const data = {}
            for(const {fishUID} of await connection.getFishUIDTable()){
                if(data[fishUID.slice(0,3)] == undefined) data[fishUID.slice(0,3)] = [];
                data[fishUID.slice(0,3)].push(fishUID.slice(3));
            }
            reslove(data)
        })
    }
    //
    connection.buildFishTable = async function (fish_id,section = '001'){
        return new Promise(async (reslove, reject)=>{
            await connection.newFishUID(section+fish_id);
            const createTableQuery = `CREATE TABLE IF NOT EXISTS ID${section+fish_id} (
                version INT AUTO_INCREMENT PRIMARY KEY,
                time BIGINT,
                bc INT,
                err INT,
                active INT
            )`;
            this.query(createTableQuery, (err, result) => {
                if (err) reject(err);
                else {
                    reslove(result)
                    //console.log(`Table(${fish_id}) created`);
                }
            });
        })
    }
    connection.updateFishData = async function (fish_id,section = '001',fish_data){
        await connection.buildFishTable(fish_id,section);
        return new Promise((reslove, reject)=>{
            this.query(`INSERT INTO ID${section+fish_id} SET ?`, fish_data, (err, result) => {
                if (err) reject(err);
                else {
                    reslove(result)
                    //console.log(`Table(${fish_id}) updated`);
                }
            });
        })
    }
    connection.deleteFishData = async function (fish_id,section = '001'){
        const deleteQuery = `DELETE FROM ID${section+fish_id} WHERE id = (SELECT MAX(id) FROM ${section+fish_id})`;
        return new Promise(()=>{
            connection.query(deleteQuery, idToDelete, (err, result) => {
                if (err) throw err;
                //console.log(`Table(${fish_id}) data deleted`);
            });
        })
    }
    connection.deleteFishTable = async function (fish_id,section = '001'){
        return new Promise((reslove, reject)=>{
            this.query(`DROP TABLE IF EXISTS ID${section+fish_id}`, (err, result) => {
                if (err) reject(err);
                else {
                    connection.deleteFishUID(section+fish_id);
                    reslove(result)
                }
            });
        })
    }
    connection.getFishTable = async function(fish_id,section = '001'){
        return new Promise(async (reslove, reject)=>{
            await connection.buildFishTable(fish_id,section);
            connection.query(`SELECT * FROM ID${section+fish_id}`, (err, result) => {
                if (err) reject(err);
                else {
                    //console.log(`Table(${fish_id}) get successfully!`);
                    reslove(result)
                }
            });
        })
    }
    connection.showFishTable = async function(fish_id,section = '001'){
        return new Promise(async (reslove, reject)=>{
            console.log(`FishUID ${section+fish_id}:`)
            reslove(console.table(await connection.getFishTable(fish_id,section)));
        })
    }
    connection.getFishData = async function(fish_id,section = '001', fish_versoion = -1){
        let query = ''
        if(fish_versoion === -1) query = `SELECT * FROM ID${section+fish_id} ORDER BY version DESC LIMIT 1`
        else query = `SELECT * FROM ID${section+fish_id} WHERE version = ${fish_versoion} LIMIT 1` ///
        return new Promise(async (reslove, reject)=>{
            await connection.buildFishTable(fish_id,section)
            this.query(query, (err, results) => {
                if (err) {
                    console.error('Error retrieving last record:', err);
                    return;
                }
                if (results.length > 0) {
                    reslove(results[0])
                } else {
                    reslove(`Data(version ${fish_versoion}) is empty.`);
                };
            });
        })
    }
    connection.buildFishesTable = async function(fish_id_object){
        return new Promise(async (reslove, reject)=>{
            for(fish_section in fish_id_object){
                for(fish_id of fish_id_object[fish_section])
                    connection.buildFishTable(fish_id,fish_section);
            }
            reslove()
        })
    }
    connection.deleteFishesTable = async function(fish_id_object){
        return new Promise(async (reslove, reject)=>{
            for(fish_section in fish_id_object){
                for(fish_id of fish_id_object[fish_section])
                    connection.deleteFishTable(fish_id,fish_section);
            }
            reslove()
        })
    }
    connection.getFishesTable = async function(fish_id_object){
        return new Promise(async (reslove, reject)=>{
            var result = {};
            for(fish_section in fish_id_object)
                for(fish_id of fish_id_object[fish_section]){
                    if(result[fish_section]===undefined) result[fish_section]={};
                    result[fish_section][`${fish_id}`] = (await connection.getFishTable(fish_id,fish_section));
                }
                reslove(result)
        })
    }
    connection.updateFishesData = async function(fish_id_object){
        return new Promise(async (reslove, reject)=>{
            for(fish_section in fish_id_object){
                for(fish_id in fish_id_object[fish_section]){
                    fish_id_object[fish_section][fish_id].time = (new Date()).getTime();
                    connection.updateFishData(fish_id,fish_section,fish_id_object[fish_section][fish_id]);
                }
            }
            reslove()
        })
    }
    connection.showFishesTable = async function(fish_id_object){
        return new Promise(async (reslove, reject)=>{
            for(fish_section in fish_id_object){
                for(fish_id of fish_id_object[fish_section])
                    await connection.showFishTable(fish_id,fish_section);
            }
           reslove();
        })
    }
    connection.getFishesData = async function(fish_id_object,history=false){
        return new Promise(async (reslove, reject)=>{
            const json_results = {};
            if(history){
                for(fish_section in fish_id_object)
                for(fish_id in fish_id_object[fish_section]){
                    if(json_results[fish_section]===undefined) json_results[fish_section]={};
                    json_results[fish_section][fish_id] = await connection.getFishData(fish_id,fish_section,fish_id_object[fish_section][fish_id])
                }
            }
            else{
                for(fish_section in fish_id_object)
                for(fish_id of fish_id_object[fish_section]){
                    if(json_results[fish_section]===undefined) json_results[fish_section]={};
                    json_results[fish_section][fish_id] = await connection.getFishData(fish_id,fish_section)
                }
            }
            reslove(json_results);
        })
    }
    connection.buildUserTable = async function (){
        return new Promise(async (reslove, reject)=>{
                const createTableQuery = `CREATE TABLE IF NOT EXISTS USER(
                    userID INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255),
                    email VARCHAR(255),
                    passcode VARCHAR(255),
                    registrationTime BIGINT,
                    level INT,
                    section VARCHAR(3)
                )`;/*active INT,
                    lastLoginedTime INT,
                    registrationTime INT*/
                this.query(createTableQuery, (err, result) => {
                    if (err) reject(err);
                    else {
                        reslove(result)
                    }
                });
            }
        )
    }
    connection.createUser = async function (user_data){
        return new Promise((reslove, reject)=>{
            this.query(`INSERT INTO USER SET ?`, user_data, (err, result) => {
                if (err) reject(err);
                else {
                    reslove(result)
                }
            });
        })
    }
    connection.getUserData = async function(value, basis = 'userID'){
        return new Promise(async (reslove, reject)=>{
            this.query(`SELECT * FROM USER WHERE ${basis} = '${value}' LIMIT 1`, (err, results) => {
                if (err) {
                    console.error('Error retrieving last record:', err);
                    return;
                }
                if (results.length > 0) {
                    reslove(results[0])
                } else {
                    reslove(`user ${value} is empty.`);
                };
            });
        })
    }
    connection.deleteUser = async function (value, basis = 'userID'){
        const deleteQuery = `DELETE FROM USER WHERE ${basis} = '${value}'`;
        return new Promise((reslove, reject)=>{
            connection.query(deleteQuery, (err, result) => {
                if (err) throw err;
            });
            reslove();
        })
    }
    connection.getUserTable = async function(section = '001'){
        return new Promise(async (reslove, reject)=>{
            let query = '';
            if(section === '001') query = `SELECT * FROM USER`;
            else query = `SELECT * FROM USER WHERE section = '${section}'` ;
            await connection.buildUserTable();
            this.query(query, (err, result) => {
                if (err) reject(err);
                else {
                    //console.log(`Table(${fish_id}) get successfully!`);
                    reslove(result)
                }
            });
        })
    }
    connection.showUserTable = async function(section = '001'){
        return new Promise(async (reslove, reject)=>{
            reslove(console.table(await connection.getUserTable(section)));
        })
    }
    connection.revisePasscode = async function(username, new_passcode){
        return new Promise((reslove, reject)=>{
            this.query(`UPDATE USER SET passcode = '${new_passcode}' WHERE username = ${username}`, (err, result) => {
                if (err) reject(err);
                else {
                    reslove(result)
                }
            });
        })
    }
    connection.deleteUserTables = async function (){
        return new Promise((reslove, reject)=>{
            this.query(`DROP TABLE IF EXISTS USER`, (err, result) => {
                if (err) reject(err);
                else {
                    reslove(result)
                }
            });
        })
    }
    connection.reviseUserLevel = async function(username, new_level){
        return new Promise((reslove, reject)=>{
            this.query(`UPDATE USER SET level = '${new_level}' WHERE username = '${username}'`, (err, result) => {
                if (err) reject(err);
                else {
                    reslove(result)
                }
            });
        })
    }
    connection.reviseUserSection = async function(username, new_section){
        return new Promise((reslove, reject)=>{
            this.query(`UPDATE USER SET section = '${new_section}' WHERE username = '${username}'`, (err, result) => {
                if (err) reject(err);
                else {
                    reslove(result)
                }
            });
        })
    }
    connection.getFishesActive = async function(username, new_section){
        return new Promise(async (reslove, reject)=>{
            const data = {};
            const fishesData = await connection.getFishesData(await connection.getFishesID())
            for(const {fishUID} of await connection.getFishUIDTable()){
                if(data[fishUID.slice(0,3)] == undefined) data[fishUID.slice(0,3)] = {};
                data[fishUID.slice(0,3)][fishUID.slice(3)] = fishesData[fishUID.slice(0,3)][fishUID.slice(3)].active
            }
            reslove(data)
        })
    }
   return connection;
}
