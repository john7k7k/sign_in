const express = require('express');
const router = express.Router();

const updateCom = require('./proc/updateCom.js');
const updateCom2 = require('./proc/updateCom2.js');
const sendCom = require('./proc/sendCom.js');
const sendComp2 = require('./proc/sendComp2.js');

router.post('/updateCom', updateCom);
router.post('/updateCom2', updateCom2);
router.get('/sendCom', sendCom);
router.get('/sendComp2', sendComp2); // 針對不同需求使用不同API處理

module.exports = router; 