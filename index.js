const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const https = require('https');
const http = require('http');
const fs = require('fs')

const app = express();

app.use('/aweme', createProxyMiddleware({ target: 'https://www.douyin.com', changeOrigin: true }));
app.use('/passport', createProxyMiddleware({ target: 'https://www.douyin.com', changeOrigin: true }));
app.use('/discover', createProxyMiddleware({ target: 'https://www.douyin.com', changeOrigin: true }));
app.use(express.static('./'))


const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
}, app);

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});