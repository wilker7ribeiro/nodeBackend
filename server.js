const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');


//const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const uuidV4 = require('uuid/v4');

// SSL
var options = {
  key: fs.readFileSync('./sslcert/key.pem'),
  cert: fs.readFileSync('./sslcert/cert.pem')
};
//var te = require('templateEngine')
// Create a service (the app object is just a callback).

var app = express();

//REGISTRO MINHA ENGINE DE TEMPLATE
app.engine('html', require('./templateService'))

//APONTO MINHA ENGINE DE TEMPLATE COMO PADRÃO
app.set('view engine', 'html');

//APONTO A PASTA QUE SERÁ PROCURADA AS VIEWS
app.set('views', path.join(__dirname, 'views'));

//APONTO A PASTA QUE FICARÁ OS ARQUIVOS ESTÁTICOS
app.use(express.static(__dirname + '/public'));


app.use(cookieSession({
  name: 'session',
  keys: ['m3u-s3gr3d0-c00k13s'],
  httpOnly: true,
  secure: false,
  maxAge: 2 * 60 * 60 * 1000 //Após 2 horas de inatividade, a sessão se perde
}))

//app.use(cookieParser("meusegredocookie"))

app.use(function (req, res, next) {
  //console.log(req.session)
  req.session.sessionId = req.session.sessionId || uuidV4(); //se já existir uma sessão, continua com o mesmo id, se não, cria um novo
  req.session.ultimaData = new Date() //qualquer alteração nos cookies reseta o tempo de vida dele
  //res.cookie("sessionId" , req.cookies.sessionId || uuidV4())
  //console.log(req.sessionOptions)
  next()
})

app.use(function (req, res, next) {
  console.log(req.session)
  next()
})



app.get('/test', function(req, res){
	//console.log('iuu')
  /*res.render('index', function(err, html){
  	console.log('iuu')
  	console.log(err)
  	console.log(html)
  	res.send(html);
  });*/
  res.render('teste');
});



// Criar o HTTP service.
http.createServer(app).listen(8091);
// criar o HTTPS service identico ao HTTP.
https.createServer(options, app).listen(8092);