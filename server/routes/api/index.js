const express = require('express');
const router = express.Router();

const account = require('./account');
const fish = require('./fish');
const section = require('./section');
const ota = require('./ota');

router.use(`/account`, account)
   
router.use(`/fish`, fish)

router.use(`/`, section)

router.use('/ota', ota)

module.exports = router;