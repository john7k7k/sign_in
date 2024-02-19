const express = require('express');
const router = express.Router();

const burn = require('./proc/burn')
const bin = require('./proc/bin')

router.get('/bin', bin.get);

router.post('/bin', bin.uploadBin.single('bin'), bin.preProcess, bin.process);

router.post('/burn', burn.execute, burn.process);

module.exports = router;