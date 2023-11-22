const express = require('express');
const router = express.Router();

const addController = require('./proc/addController.js');

const verifyTokenBy = require('../../../modules/middleware/verifyToken');
const verifyAdmin = require('../../../modules/middleware/verifyAdmin')

router.post(`/add`, addController);


module.exports = router;