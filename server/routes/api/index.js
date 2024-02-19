const express = require('express');
const router = express.Router();

const account = require('./account');
const fish = require('./fish');
const section = require('./section');
const ota = require('./ota');
const controller = require('./controller');

router.use(`/account`, account)
   
router.use(`/fish`, fish)

router.use(`/`, section)

router.use('/ota', ota)

router.use('/controller', controller)

module.exports = router;