var express = require('express');
var path    = require('path');
var app     = express();
var favicon = require('serve-favicon');
var ENV     = process.env.NODE_ENV || 'development'
var IS_DEVELOPING = process.env.NODE_ENV !== 'production';
var PORT    = IS_DEVELOPING ? 3001 : process.env.PORT;

app.set('view engine', 'pug')
app.set('views', './src')

//Assets

app.use(favicon(path.join(__dirname, 'src/assets/images/football.png')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!');
})