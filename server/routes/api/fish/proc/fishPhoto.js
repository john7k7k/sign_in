const path = require('path');
const multer = require('multer');
const fs = require('fs')
const { prisma } =  require('../../../../modules/util/myPrisma.js') ;

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
        if(!photos.at(-1)) return res.send('no image');
        if(err) return res.status(403).send('fishUID 未找到');
        res.sendFile(path.join(dir,photos.at(-1)));
    })
}

const remove = (req, res) => {
    const dir = path.join(__dirname, `../../../../uploads/photos/fish/${req.query.fishUID}`);
    console.log(dir)
    fs.unlink(dir + req.body.addTime , (err, photos) => {
        res.sendStatus(200);
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
    getURL,
    remove
}