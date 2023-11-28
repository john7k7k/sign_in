const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const path = require('path');
const multer = require('multer');

const uploadBin = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/ota`);
        },
        filename: (req, file, cb) => {
            req.time =  Math.floor((new Date()).getTime()/1000)
            cb(null, req.time  + '_' + req.body.version);
        }
    })
})

const get = async (req, res) => {
    const bins = await prisma.bin.findMany({
        select: {
            version: true,
            time: true
        }
    });
    res.send(bins)
}

const preProcess = async (req, res, next) => {
    try{
        await fs.rename(`../../../../uploads`)
        await prisma.bin.create({
            data: {
                time: req.time,
                version: req.body.version
            }
        })
    }catch(err){ res.status(403).send('版本名已存在'); return }
    next();
}

const process = async (req, res) => {
    res.sendStatus(200);
}

module.exports = {
    uploadBin,
    preProcess,
    process,
    get
}