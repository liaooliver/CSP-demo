const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'sha256-+G1K8Zzydu91ZGTFxiMBRTNrOA+pHuTkdmzo85wn59Q='"
  );
  next();
});

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const server = app.listen(process.env.PORT || 5503, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});