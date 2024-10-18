const express = require('express');
const router = express.Router();

const burn = require('./proc/burn')
const bin = require('./proc/bin')
const getBinVersion = require('./proc/getBin')
const deleteBin = require('./proc/deleteBin')

router.get('/bin', getBinVersion);

router.delete('/deleteBin', deleteBin)

router.post('/bin', bin.uploadBin.single('bin'), bin.preProcess, bin.process);

router.post('/burn', burn.execute, burn.process);

module.exports = router;