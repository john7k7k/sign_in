const express = require('express');
const app = express();

const allowDomainOnly = () => 
    (req, res, next) => {
  const allowedDomain = 'aifish.cc'; 
  const requestOrigin = req.get('Host');
        console.log( requestOrigin);
  if (requestOrigin === `http://${allowedDomain}` || requestOrigin === `https://${allowedDomain}`) {

    next();
  } else {
    res.status(403).send('Access Forbidden');
  }
};
module.exports = allowDomainOnly;