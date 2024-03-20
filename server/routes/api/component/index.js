const express = require('express');
const router = express.Router();

const updateCom = require('./proc/updateCom.js');
const sendCom = require('./proc/sendCom.js');

router.post(`/`, updateCom);
router.get(`/`, sendCom);

module.exports = router;