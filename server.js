const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(function (req, res, next) {
  res.setHeader(
    'Report-To',
    '{"group":"csp-endpoint","max_age":10886400,"endpoints":[{"url":"http://localhost:5500/__cspreport__"}],"include_subdomains":true}'
  );
  res.setHeader(
    'Content-Security-Policy',
    //"default-src 'self'; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://images.unsplash.com; script-src 'self' https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/ ; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css; frame-src 'self' https://www.youtube.com https://youtube.com; report-to csp-endpoint; report-uri /__cspreport__;"
    //"default-src 'self'; img-src 'self' https://images.unsplash.com;"
    "default-src 'self'; script-src 'self' 'unsafe-inline https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/; report-uri /__cspreport__; "
  );
  next();
});

app.use(
  bodyParser.json({
    type: [
      'application/json',
      'application/csp-report',
      'application/reports+json',
    ],
  })
);
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/__cspreport__', (req, res) => {
  console.log(req.body);
});

const server = app.listen(process.env.PORT || 5500, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});