var express = require('express');
var app = express();
var http = require('http');
var mysql = require('mysql');
var server = http.Server(app);

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

var options = {
  host: 'api.giphy.com'
};

//connect mysql
var dbConnection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'password',
  multipleStatements: true
  //database : 'search-terms'
});
dbConnection.connect();

app.get('/getGiffy', function(req,res) {

  var keyword = req.query.keyword || '';

  dbConnection.query("SELECT * FROM `rhumbix-search`.`search-terms` WHERE `term` = ?", [keyword], function(err, result) {

    if (result.length) {
      options.path = '/v1/gifs/search?q=' + keyword + '&api_key=dc6zaTOxFJmzC&limit=1&offset=0';

      http.get(options, function (response) {

        var str = ''
        response.on('data', function (chunk) {
          str += chunk;
        });

        response.on('end', function () {
          var responseObj = JSON.parse(str);
          var gifImageObj = responseObj.data[0] || {};
          console.log(gifImageObj);
          res.jsonp(JSON.stringify(gifImageObj));
        });
      });
    } else {
      res.jsonp(JSON.stringify({status:'fail', errorMsg:'term not allowed'}));
    }

  });
});


server.listen(8888, function() {
    console.log('listening on localhost:8888');
});