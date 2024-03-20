const express = require('express');
const router = express.Router();

const account = require('./account');
const fish = require('./fish');
const section = require('./section');
const ota = require('./ota');
const controller = require('./controller');
const component = require('./component');

router.use(`/account`, account)
   
router.use(`/fish`, fish)

router.use(`/`, section)

router.use('/ota', ota)

router.use('/controller', controller)

router.use('/component', component)

module.exports = router;