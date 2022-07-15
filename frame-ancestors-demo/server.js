const express = require('express');
const path = require('path');
const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; frame-src 'self' https://www.youtube.com https://youtube.com; frame-ancestors 'none'"
  );
  next();
});

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/outter-iframe.html'));
})

app.get('/inner', (req, res) => {
  res.sendFile(path.join(__dirname + '/inner-iframe.html'));
});

const server = app.listen(process.env.PORT || 5501, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});