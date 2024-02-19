const path = require('path');
const multer = require('multer');

const upSticker = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/photos/user/${req.payload.username}/sticker`);
        },
        filename: (req, file, cb) => {
            cb(null, 'sticker.jpg');
        }
    })
})

const get = (req, res) => {
    res.sendFile(path.join(__dirname, `../../../../uploads/photos/user/${req.payload.username}/sticker/sticker.jpg`))
}

module.exports = {
    upSticker,
    process: (req, res) => {
        console.log(req.file);
        res.sendStatus(200)
    },
    get
}