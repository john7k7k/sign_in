/**
 * @param {*} sql_data 
 */

const createConnection = require('mysql').createConnection ;
const connectionMap = {};
var fishIdArray = [];
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
    connection.buildFishTable = async function (fish_id){
        return new Promise(async (reslove, reject)=>{
            if(fishIdArray.includes(fish_id)) reslove('');
            else {
                fishIdArray.push(fish_id);
                const createTableQuery = `CREATE TABLE IF NOT EXISTS ID${fish_id} (
                    version INT AUTO_INCREMENT PRIMARY KEY,
                    time INT,
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
            }
        })
    }
    connection.updateFishData = async function (fish_id,fish_data){
        await connection.buildFishTable(fish_id)
        return new Promise((reslove, reject)=>{
            this.query(`INSERT INTO ID${fish_id} SET ?`, fish_data, (err, result) => {
                if (err) reject(err);
                else {
                    reslove(result)
                    //console.log(`Table(${fish_id}) updated`);
                }
            });
        })
    }
    connection.deleteFishData = async function (fish_id){
        const deleteQuery = `DELETE FROM ID${fish_id} WHERE id = (SELECT MAX(id) FROM ${fish_id})`;
        return new Promise(()=>{
            connection.query(deleteQuery, idToDelete, (err, result) => {
                if (err) throw err;
                //console.log(`Table(${fish_id}) data deleted`);
            });
        })
    }
    connection.deleteFishTable = async function (fish_id){
        return new Promise((reslove, reject)=>{
            this.query(`DROP TABLE IF EXISTS ID${fish_id}`, (err, result) => {
                if (err) reject(err);
                else {
                    fishIdArray = fishIdArray.filter((element) => element != fish_id)
                    //console.log(`Table(${fish_id}) deleted`);
                    reslove(result)
                }
            });
        })
    }
    connection.getFishTable = async function(fish_id){
        return new Promise((reslove, reject)=>{
            connection.buildFishTable(fish_id);
            this.query(`SELECT * FROM ID${fish_id}`, (err, result) => {
                if (err) reject(err);
                else {
                    //console.log(`Table(${fish_id}) get successfully!`);
                    reslove(result)
                }
            });
        })
    }
    connection.showFishTable = async function(fish_id){
        return new Promise(async (reslove, reject)=>{
            console.log(`FishID ${fish_id}:`)
            reslove(console.table(await connection.getFishTable(fish_id)));
        })
    }
    connection.getFishData = async function(fish_id, fish_versoion = -1){
        let query = ''
        if(fish_versoion === -1) query = `SELECT * FROM ID${fish_id} ORDER BY version DESC LIMIT 1`
        else query = `SELECT * FROM ID${fish_id} WHERE version = ${fish_versoion} LIMIT 1` ///
        return new Promise(async (reslove, reject)=>{
            await connection.buildFishTable(fish_id)
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
    connection.buildFishesTable = async function(fish_id_array){
        return new Promise(async (reslove, reject)=>{
            for(var fish_id of fish_id_array){
                await connection.buildFishTable(fish_id)
            }
            reslove()
        })
    }
    connection.deleteFishesTable = async function(fish_id_array = fishIdArray){
        return new Promise(async (reslove, reject)=>{
            for(var fish_id of fish_id_array){
                await connection.deleteFishTable(fish_id)
            }
            reslove()
        })
    }
    connection.getFishesTable = async function(fish_id_array = fishIdArray){
        return new Promise(async (reslove, reject)=>{
            var result = {};
            for(var fish_id of fish_id_array){
                result[`${fish_id}`] = (await connection.getFishTable(fish_id))
            }
            reslove(result)
        })
    }
    connection.updateFishesData = async function(fish_json){
        return new Promise(async (reslove, reject)=>{
            for(var fish_id of Object.keys(fish_json)){
                await connection.updateFishData(fish_id,fish_json[fish_id])
            }
            reslove()
        })
    }
    connection.showFishesTable = async function(fish_id_array = fishIdArray){
        return new Promise(async (reslove, reject)=>{
            for(fish_id of fish_id_array){
                await connection.showFishTable(fish_id);
            }
           reslove();
        })
    }
    connection.getFishesData = async function(fish_id_array = fishIdArray, fish_versions = -1){
        return new Promise(async (reslove, reject)=>{
            const json_results = {}
            if (fish_versions === -1)
                for(fish_id of fish_id_array){
                    json_results[`${fish_id}`] = await connection.getFishData(fish_id);
                }
            else 
                for(index in fish_id_array){
                    json_results[`${fish_id_array[index]}`] = await connection.getFishData(fish_id_array[index],fish_versions[index]);
                }
            //console.log(json_results);
            reslove(json_results);
        })
    }
   return connection;
}
