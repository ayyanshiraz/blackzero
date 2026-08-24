const https = require('https');

console.log("Testing connection to Google...");

https.get('https://oauth2.googleapis.com/token', (res) => {
  console.log('✅ Success! Status Code:', res.statusCode);
  console.log('If status is 404 or 400, that is GOOD (it means we reached the server).');
}).on('error', (e) => {
  console.error('❌ CONNECTION FAILED:', e);
});