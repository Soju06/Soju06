const express = require('express')
const path = require('path');
const ejs = require('ejs');
const app = express()
const port = 3000;

app.use(express.static(__dirname + '/app'));
app.set('views', path.join(__dirname, '/app'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.get('/', function(req, res) {
    // console.log('client connected ' + req.ip);
    res.render('app.html');
  });

app.listen(port, 0, () => {
  console.log('app listening at http://localhost:' + port)
})