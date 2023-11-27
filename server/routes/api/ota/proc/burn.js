const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { exec } = require('child_process');

const path = require('path');
const multer = require('multer');

const execute = async (req,res,next) => {
    const { time, version } = await prisma.bin.findUnique({
        where: {
            version: req.body.version
        }
    })
    const binName = `${time}_${version}`;
    const options = {
        cwd: path.join(__dirname,'sh','flash')
      };
    console.log(`start flash`);
    const port = fetch('https://frp.aifish.cc/api/proxy/tcp');
    const bash = `remote_flash.sh 10.2.0.5 ${port}`;
    //const bash = `test.sh`
    exec(bash, options, (err, stdout, stderr) => {
        if(err) { console.log(err); return;}
        console.log(stdout);
    })
    next();
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
    res.sendStatus(200);
}

module.exports = {
    execute,
    process
}