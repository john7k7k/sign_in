const express = require('express');
const router = express.Router();

const addPool = require('./proc/addPool');
const addDepart = require('./proc/addDepart');
const addInstruction = require('./proc/addInstruction');
const getSection = require('./proc/getSection');

router.post(`/pool`, addPool)
   
router.post(`/depart`, addDepart)

router.post(`/instruction`, addInstruction)

router.get(`/section`, getSection)

module.exports = router;
