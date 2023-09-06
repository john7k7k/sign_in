const infoMap = require('./infoMap');
const fs = require('fs');
const path = require('path')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = () => {
    const fishError = JSON.parse(fs.readFileSync(path.join(__dirname,'../../config/fishError.json'), 'utf8'))
    return {
        code: infoMap(
            ['ntut','nmmst','pmp'],
            ['002','003','004']
        ),
        chinese: infoMap(
            ['ntut','nmmst','pmp'],
            ['北科','海科','先鋒']
        ),
        error: infoMap(
            ['魚關機了', ...Object.values(fishError)],
            [-1, ...Object.keys(fishError).map(Number)]
        ),
        async nameOfInstruction(instructionID){
            instructionTable = await prisma.instruction.findMany();
            for (let { id, name } of instructionTable){
                if(id === instructionID) return name;
            }
        },
        async nameOfDepart(departID){
            departTable = await prisma.depart.findMany();
            for (let { id, name } of departTable){
                if(id === departID) return name;
            }
        },
        async nameOfPool(poolID){
            poolTable = await prisma.pool.findMany();
            for (let { id, name } of poolTable){
                if(id === poolID) return name;
            }
        }
    }
}



  