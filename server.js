const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// app.use(function (req, res, next) {
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src 'self'; font-src 'self' https://fonts.google.com/; img-src 'self'; script-src 'self'; style-src 'self' https://fonts.google.com/; frame-src 'self'"
//   );
//   next();
// });

const data = [
  { msg: "\<\s" + "cript>alert(123)</script>" }
]

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/getmsg', (req, res) => {
  res.json(data)
})

app.post('/postmsg', (req, res) => {

  const body = req.body
  console.log(body)
  data[0] = body

  res.json({ success: true })
})

app.get('/script', (req, res)=>{
  res.json({ data: '<script>alert("nodejs")</script>' })
})

const server = app.listen(process.env.PORT || 5500, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});
