const express = require('express');
const mysql = require('mysql');
const app = express();

// 建立與資料庫的連接
const connection = mysql.createConnection({
  host: '20.89.131.34:3307',
  user: 'lab314test',
  password: '8Bs$hT3xNL1Y#SUpwL',
  database: 'lab314'
});

// 連接到資料庫
connection.connect((err) => {
  if (err) {
    console.error('無法連接到資料庫:', err);
  } else {
    console.log('已成功連接到資料庫');
  }
});

// 處理API請求，從資料庫中擷取資料
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM testForm2';

  // 執行資料庫查詢
  connection.query(query, (err, results) => {
    if (err) {
      console.error('查詢資料庫時出錯:', err);
      res.status(500).json({ error: '無法從資料庫中獲取資料' });
    } else {
      console.log(result)
      res.json(results);
    }
  });
});

// 啟動伺服器
app.listen(3000, () => {
  console.log('伺服器已啟動，監聽埠號3000');
});