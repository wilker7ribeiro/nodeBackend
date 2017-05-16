const path = require('path');
//const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const uuidV4 = require('uuid/v4');

module.exports = function(app, express){
	//REGISTRO MINHA ENGINE DE TEMPLATE
	app.engine('html', require('./viewEngine'))

	//APONTO MINHA ENGINE DE TEMPLATE COMO PADRÃO
	app.set('view engine', 'html');

	//APONTO A PASTA QUE SERÁ PROCURADA AS VIEWS
	app.set('views', path.join(__dirname, 'views'));

	//APONTO A PASTA QUE FICARÁ OS ARQUIVOS ESTÁTICOS
	app.use(express.static(__dirname + '/public'));

	//CONFIGURO O COOKIE SESSION
	app.use(cookieSession({
	  name: 'session',
	  keys: ['m3u-s3gr3d0-c00k13s'],
	  httpOnly: true,
	  secure: false,
	  maxAge: 2 * 60 * 60 * 1000 //Após 2 horas de inatividade, a sessão se perde
	}))

	//app.use(cookieParser("meusegredocookie"))

	//TRATAMETNO DE REQUESTS
	app.use(function (req, res, next) {
	  //console.log(req.session)
	  req.location = req.headers['accept-language'].split(',')[0];
	  req.session.sessionId = req.session.sessionId || uuidV4(); //se já existir uma sessão, continua com o mesmo id, se não, cria um novo
	  req.session.ultimaData = new Date(); //qualquer alteração nos cookies reseta o tempo de vida dele
	  //res.cookie("sessionId" , req.cookies.sessionId || uuidV4())
	  //console.log(req.sessionOptions)
	  next();
	})

}