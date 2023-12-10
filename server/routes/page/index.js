const express = require('express');
const router = express.Router();
const sendpage = require('./sendPage');
const verifyTokenBy = require('../../modules/middleware/verifyToken');

router.get('/', function(req, res) { res.redirect('login'); });
  
router.get(/^\/(?:login|sign\/up|homepage|about|services|contact)$/, sendpage);

router.get(
    /^\/(?:ntut\/fish|nmmst\/fish|ntut\/fish\/edit|nmmst\/fish\/edit|user|home|fish\/list|account\/list)$/, 
    verifyTokenBy('Cookie', redirect = '/login')(), 
    sendpage
);

router.get('*', sendpage);

module.exports = router
