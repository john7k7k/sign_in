const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { exec, spawn , execSync, execFile} = require('child_process');
const fs = require('fs')
const path = require('path');
const multer = require('multer');

const execute = async (req,res,next) => {
    const { time, version } = (await prisma.bin.findMany({
        take: 1,
        orderBy: { time: 'desc' }
    }))[0]
    const otaBinName = path.join(__dirname, `sh/flash/aifi_core_stm32_MPU_loopTest_20230920.bin`);
    fs.rename(path.join(__dirname,`../../../../uploads/ota/${req.time  + '_' + req.body.version}`), otaBinName, () => {
        const binName = `${time}_${version}`;
        const options = {
            cwd: path.join(__dirname,'/sh','/flash')
        };
        console.log(`start flash`);
        // const port = fetch('https://frp.aifish.cc/api/proxy/tcp');
        //const bash = `remote_flash.sh 10.2.0.5 ${port}`;
        const bash = `test.sh`
        exec(bash, options,  (err, stdout, stderr) => {
            if(err) { console.log("錯誤"+err)}
            console.log('輸出'+stdout);
            console.log('輸'+stderr);
        })
        next(); 
    })
    
}

const process = async (req, res) => {
    await prisma.fish.updateMany({
        where: {
            fishUID: {
                in: req.body.fishesUID
            }
        },
        data: {
            version: req.body.version
        }
    })
    setTimeout( () => res.sendStatus(200),3700);
}

module.exports = {
    execute,
    process
}