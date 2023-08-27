
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();
require("dotenv").config();

module.exports = {      
    user: {
        
    },
    fish:,
    fishData:,
    fishAble:,
    pool:,
    depart:
    instruction:
    
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

