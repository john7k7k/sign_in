import axios from 'axios';

const userlogin = axios.create({
  baseURL: 'http://'
});

export const apiUserLogin = data => {
  const headers = {
    // 在這裡加入你的標頭資訊
    'Content-Type': 'application/json',
    
  };

  return userlogin.post('/20.89.131.34:443/login_respond/', data, { headers });
};


