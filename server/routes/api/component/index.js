const express = require('express');
const router = express.Router();

const updateCom = require('./proc/updateCom2.js');
const sendCom = require('./proc/sendCom.js');

router.post('/updateCom', updateCom)
router.get(`/`, sendCom);

module.exports = router;