const express = require('express');
const router = express.Router();

// const addPool = require('./proc/addPool');
const getstatus = require('./proc/getStatus');


router.get(`/getStatus`, getstatus);

module.exports = router;
