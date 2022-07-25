const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const http = require('http');
const fs = require('fs')

const app = express();

app.use('/api', createProxyMiddleware({ target: 'https://www.tiktok.com', changeOrigin: false }));
app.use('/node', createProxyMiddleware({ target: 'https://www.tiktok.com', changeOrigin: false }));
app.use('/ttwid', createProxyMiddleware({ target: 'https://www.tiktok.com', changeOrigin: false }));
app.use('/passport', createProxyMiddleware({ target: 'https://www.tiktok.com', changeOrigin: false }));
app.use(express.static('./'))


const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
}, app);

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});