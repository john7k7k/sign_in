const express = require('express');
const router = express.Router();

const login = require('./proc/login');

const verifyTokenBy = require('../../../modules/middleware/verifyToken');
const verifyAdmin = require('../../../modules/middleware/verifyAdmin')

router.post(`/login`, login);


module.exports = router;