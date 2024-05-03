const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const allowDomainOnly = require('../middleware/verifyDomin');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

module.exports = (app, task = () => void 0) => {
    app.use(express.json())
    app.use(cors())
    app.use(cookieParser())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use("/public", express.static('../public'));
    app.use("/img", express.static('../public/img'));
    app.use("/js", express.static('../public/js/'));
    app.use("/fonts", express.static('../public/fonts/'));
    app.use("/css", express.static('../public/css/'));
    app.use("/index", express.static('../public/'));
    app.use("/uploads", express.static('../uploads'));
    app.use("/resume", express.static('resume'));
    app.use("/toYunyun", express.static('exweb/love'));
    global.prisma = new PrismaClient();
    const port = 3000;
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    task();
}