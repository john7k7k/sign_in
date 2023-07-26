const fetch = require('node-fetch');
require("dotenv").config();

const lineNotifyEndpoint = 'https://notify-api.line.me/api/notify';
const accessToken = process.env.DB_LINE_TOKEN;

module.exports = (message) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${accessToken}`
  };

  const data = new URLSearchParams();
  data.append('message', message);

  return fetch(lineNotifyEndpoint, {
    method: 'POST',
    headers,
    body: data
  }).then((res) => {
    if(res == 200)
    console.log('Line Notify message sent successfully');
  })
  .catch((error) => {
    console.error('Error sending Line Notify message:', error);
  });
}