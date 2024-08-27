const express = require('express');
const router = express.Router();

const addPool = require('./proc/addPool');


router.post(`/pool`, addPool)

module.exports = router;
