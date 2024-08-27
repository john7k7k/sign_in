const express = require('express');
const router = express.Router();

const addPool = require('./proc/addPool');
const addDepart = require('./proc/addDepart');
const addInstruction = require('./proc/addInstruction');
const getSection = require('./proc/getSection');
const deletePool = require('./proc/deletePool');
const deleteInstruction = require('./proc/deleteInstruction');
const deleteDapart = require('./proc/deleteDapart');
const alivefish = require('./proc/getFish.js');

router.post(`/pool`, addPool)
   
router.post(`/depart`, addDepart)

router.post(`/instruction`, addInstruction)

router.get(`/section`, getSection)

router.delete(`/pool`, deletePool)

router.delete(`/instruction`, deleteInstruction)

router.delete('/depart', deleteDapart)

router.get(`/alivefish`, alivefish)

module.exports = router;
