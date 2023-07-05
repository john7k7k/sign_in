const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');
const app = express();

// 登录路由
app.post('/login', (req, res) => {
  // 模拟用户验证，验证通过后生成 token
  const user = {
    id: 1,
    username: 'exampleuser'
  };

  jwt.sign({ user }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
    if (err) {
      res.status(500).json({ error: 'Failed to generate token' });
    } else {
      // 将 token 发送给客户端
      console.log(token)
      res.json({ token });
    }
  });
});

// 需要验证 token 的受保护路由
app.get('/protected', verifyToken, (req, res) => {
  // 验证通过后，返回受保护的页面
  res.sendFile(path.join(__dirname, './static/ac.html'));
});
app.get('/', (req, res) => {
  // 验证通过后，返回受保护的页面
  res.sendFile(path.join(__dirname, './static/ab.html'));
});
// Token 验证中间件
function verifyToken(req, res, next) {
  // 获取请求头中的 token
  const bearerHeader = req.headers['authorization'];

  // 检查 token 是否存在
  if (typeof bearerHeader !== 'undefined') {
    // 从请求头中提取 token
    const bearerToken = bearerHeader.split(' ')[1];
    // 将 token 保存到请求对象中
    req.token = bearerToken;
    // 继续下一个中间件或路由处理程序
    next();
  } else {
    // 如果没有 token，返回未授权状态
    res.sendStatus(403);
  }
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});