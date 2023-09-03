const express = require('express');
const router = express.Router();

const api = require('./api')
const page = require('./page');

router.use(`/api/v1`, api);

router.use(`/`, page);

module.exports = router;