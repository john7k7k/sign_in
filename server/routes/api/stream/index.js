const express = require('express');
const router = express.Router();

const execTest = require('./proc/execTest');
const getPhoto = require('./proc/getPhoto');
const sendPhiotoTest = require('./proc/sendPhotoTest');
const dbtest = require('./proc/dbtest')


router.get(`/getPhoto`, getPhoto);
router.use(`/execTest`, execTest);
router.get(`/sendPhotoTest`, sendPhiotoTest);
router.get(`/dbtest`, dbtest);


module.exports = router;
