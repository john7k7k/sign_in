const path = require('path');
const multer = require('multer');
const fs = require('fs')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/photos/fish/${req.query.fishUID}` , {recursive: true},() => void 0);
        },
        filename: (req, file, cb) => {
            cb(null, `${(new Date()).getTime()}.jpg`);
        }
    })
})

const get = (req, res) => {
    const dir = path.join(__dirname, `../../../../uploads/photos/fish/${req.query.fishUID}`);
    console.log(dir)
    fs.readdir(dir , (err, photos) => {
        console.log(photos)
        if(!photos.includes(req.query.time)) return res.sendStatus(403);
        res.sendFile(path.join(dir,req.query.time));
    })
}

const getURL = async (req, res) => {
    const { userID } = await prisma.user.findUnique({
        where: { username: req.payload.username }
    })
    const fishesUID = (await prisma.fishAble.findMany({
        where: { userID }
    })).map(({userID, fishUID}) => fishUID);
    const fishPhotoName = {};
    fishesUID.forEach(fishUID => {
        const dir = path.join(__dirname, `../../../../uploads/photos/fish/${fishUID}`);
        console.log(dir)
        fs.readdir(dir , (err, photos) => {
            console.log(photos)
            fishPhotoName[fishUID] = photos
            if(fishUID === fishesUID.at(-1)) return res.send(fishPhotoName);
        })
    })
}

module.exports = {
    upload,
    process: (req, res) => {
        console.log(req.file);
        res.sendStatus(200)
    },
    get,
    getURL
}