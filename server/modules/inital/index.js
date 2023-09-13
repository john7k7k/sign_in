const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const allowDomainOnly = require('../middleware/verifyDomin');

module.exports = (app, task = () => void 0) => {
    app.use(express.json())
    app.use(cors())
    app.use(cookieParser())
    app.use("/public", express.static('../public'));
    app.use("/img", express.static('../public/img'));
    app.use("/js", express.static('../public/js/'));
    app.use("/fonts", express.static('../public/fonts/'));
    app.use("/css", express.static('../public/css/'));
    app.use("/index", express.static('../public/'));
    app.use("/uploads", express.static('../uploads'));
    app.use(allowDomainOnly());
    const port = 3000;
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
    task();
}