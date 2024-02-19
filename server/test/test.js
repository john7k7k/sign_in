const axios = require('axios');

// 定義要請求的URL
const url = 'https://frp.aifish.cc/api/proxy/tcp';

// 使用 Axios 發送 GET 請求
axios.get(url)
  .then(response => {
    // 處理回應數據
    console.log('成功取得資料:', response.data);
  })
  .catch(error => {
    // 處理錯誤
    console.error('錯誤:', error);
  });