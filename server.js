var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

var options = {
  host: 'api.giphy.com'
};

app.get('/getGiffy', function(req,res) {

  var keyword = req.query.keyword || '';

  options.path = '/v1/gifs/search?q=' + keyword + '&api_key=dc6zaTOxFJmzC&limit=1&offset=0';

  http.get(options, function (response) {

    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      var responseObj = JSON.parse(str);
      var gifImageObj = responseObj.data[0] || {}
      res.jsonp(JSON.stringify(gifImageObj));
    });
  });
});


server.listen(8888, function() {
    console.log('listening on localhost:8888');
});