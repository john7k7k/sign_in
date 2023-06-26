const fetch = require('node-fetch');

const lineNotifyEndpoint = 'https://notify-api.line.me/api/notify';
const accessToken = 'fyW2bnAJTjQd1yVMkWYIRK95lVTqldPWeZny7PKWWZA';

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
  }).then(() => {
    console.log('Line Notify message sent successfully');
  })
  .catch((error) => {
    console.error('Error sending Line Notify message:', error);
  });
}