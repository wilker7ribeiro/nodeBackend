const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');


// SSL
var options = {
  key: fs.readFileSync('./sslcert/key.pem'),
  cert: fs.readFileSync('./sslcert/cert.pem')
};
//var te = require('templateEngine')
// Create a service (the app object is just a callback).

var app = express();

require('./config.js')(app, express)




app.use(function (req, res, next) {
 
  next();
})



app.get('/test', function(req, res){

 // console.log(req.location)
 
	//console.log('iuu')
  /*res.render('index', function(err, html){
  	console.log('iuu')
  	console.log(err)
  	console.log(html)
  	res.send(html);
  });*/
  res.render('templates/home/view/home');
});



// Criar o HTTP service.
http.createServer(app).listen(8091);
// criar o HTTPS service identico ao HTTP.
https.createServer(options, app).listen(8092);