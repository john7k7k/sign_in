const express = require('express');
const app = express();

// 自定义中间件来检查请求的来源
const allowDomainOnly = () => 
    (req, res, next) => {
  const allowedDomain = 'aifish.cc'; // 替换为你的域名
  const requestOrigin = req.headers.origin || req.headers.referer;

  if (requestOrigin === `http://${allowedDomain}` || requestOrigin === `https://${allowedDomain}`) {
    next();
  } else {
    res.status(403).send('Access Forbidden');
  }
};
module.exports = allowDomainOnly;