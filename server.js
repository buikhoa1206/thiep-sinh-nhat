/**
 * SERVER.JS - EXPRESS STATIC FILE SERVER CHO RENDER.COM & DEPLOYMENT
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Phục vụ toàn bộ các file tĩnh (html, css, js, mp3) trong thư mục dự án
app.use(express.static(path.join(__dirname)));

// Mặc định chuyển hướng mọi request về trang index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎉 Thiệp Mời Sinh Nhật Hoàng Gia đang chạy thành công tại cổng ${PORT}`);
});
