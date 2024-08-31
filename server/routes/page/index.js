const express = require('express');
const router = express.Router();
const sendpage = require('./sendPage');
const verifyTokenBy = require('../../modules/middleware/verifyToken');
const path = require('path');

router.get('/', function(req, res) { res.redirect('login'); });
  
router.get(/^\/(?:login|sign\/up|homepage|about|services|contact|voicecontrol)$/, sendpage);

router.get(
    /^\/(?:ntut\/fish|\nmmst\/fish|ntut\/fish\/edit|nmmst\/fish\/edit|user|home|fish\/list|account\/list|interact|sign\/up\/pool|controller|select\/instruction)$/, 
    verifyTokenBy('Cookie', redirect = '/login')(), 
    sendpage
);

router.get('/resume', (req, res) => {
    res.sendFile(path.join(__dirname, '../../resume/index.html'));
});

router.get('/introduce', (req, res) => {
    res.sendFile(path.join(__dirname, '../../exweb/introduce/pub/index.html'));
});

router.get('/toYunyun', (req, res) => {
    res.sendFile(path.join(__dirname, '../../exweb/love/index.html'));
});

router.get('*', sendpage);

module.exports = router
