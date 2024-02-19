const express = require('express');
const router = express.Router();

const addPool = require('./proc/addPool');
const addDepart = require('./proc/addDepart');
const addInstruction = require('./proc/addInstruction');
const getSection = require('./proc/getSection');
const deletePool = require('./proc/deletePool');
const deleteInstruction = require('./proc/deleteInstruction');
const deleteDapart = require('./proc/deleteDapart');

router.post(`/pool`, addPool)
   
router.post(`/depart`, addDepart)

router.post(`/instruction`, addInstruction)

router.get(`/section`, getSection)

router.delete(`/pool`, deletePool)

router.delete(`/instruction`, deleteInstruction)

router.delete('/depart', deleteDapart)

module.exports = router;
