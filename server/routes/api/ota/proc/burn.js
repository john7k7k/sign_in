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
    console.log(`rsync -r ../uploads/ota/${ binName } @$2:/home/$1/aifi_ota/`);
    /*
    exec(`rsync -r ../uploads/ota/${ binName } @$2:/home/$1/aifi_ota/`, (err, stdout, stderr) => {
        if(err) { console.log(err); return;}
        console.log(stdout);
    })*/
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