const express = require('express');
const router = express.Router();

const account = require('./account');
const fish = require('./fish');
const section = require('./section');

router.use(`/account`, account)
   
router.use(`/fish`, fish)

router.use(`/`, section)

module.exports = router;