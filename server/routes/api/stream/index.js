const express = require('express');
const router = express.Router();

const execTest = require('./proc/execTest');
const getPhoto = require('./proc/getPhoto');
const sendPhiotoTest = require('./proc/sendPhotoTest');


router.get(`/getPhoto`, getPhoto);
router.use(`/execTest`, execTest);
router.get(`/sendPhotoTest`, sendPhiotoTest);


module.exports = router;
