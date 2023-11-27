const express = require('express');
const router = express.Router();

const addController = require('./proc/addController.js');
const deleteController = require('./proc/deleteController.js');
const reviseController = require('./proc/reviseAble.js');
const getController = require('./proc/getController.js');

const verifyTokenBy = require('../../../modules/middleware/verifyToken');
const verifyAdmin = require('../../../modules/middleware/verifyAdmin')

router.post(`/add`, addController);
router.post('/delete', deleteController);
router.get(`/`, getController);
router.post('/revise', reviseController);

module.exports = router;