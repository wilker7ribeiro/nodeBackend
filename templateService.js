	"use strict"
	var fs = require('fs');

	class TemplateService {
		constructor(loc){
			this.listaStringsSalvas = {};
			this.loc = loc || "pt_BR";
		}

		getArquivoStrings (loc){
			try{
				var jsonStrings = fs.readFileSync(STRINGS_FILES_PATH+loc+".json");
			} catch(err){

				var jsonStrings = fs.readFileSync(STRINGS_FILES_PATH+"pt_BR"+".json");
			}
			return jsonStrings;
		}


		carregarPagina (path, cb){
			var self = this;
			var conteudoPagina;
			try {
				conteudoPagina = fs.readFileSync(path).toString();
			} catch (err){
				cb(err)
			}

			conteudoPagina = conteudoPagina.replace(REGEX_TEMPLATE_SERVICE, function(match,capture){
				return self.replaceAuto(match, capture);
			})

			cb(null,conteudoPagina);
		}

		processarTemplate (flag){
			//console.log(flag)
			var content;
			var self = this;
			flag = flag.substring(4, flag.length);
			var path = flag.replace(/=/g,"/");
			try {
				content = fs.readFileSync(TEMPLATE_PATH+path+FILE_SUFFIX).toString();
			} catch (err){
				return "^"+path+"^"
			}

			content = content.replace(REGEX_TEMPLATE_SERVICE, function(match,capture){
				return self.replaceAuto(match, capture)
			})
			return content;
		}


		processarMatchTemplate(flag){
			return this.processarTemplate(flag, this.loc);
		}

		processarMatchLocString(flag){
			flag = flag.substring(4, flag.length);

			return this.getArquivoStrings(this.loc)[flag.toUpperCase()] || flag
		}

		processarMatchString(flag){
			return this.listaStringsSalvas[flag] || flag;
		}

		replaceAuto(match, capture){
			var flag = capture;
			if(capture.startsWith(TEMPLATE_FLAG)){
				return this.processarMatchTemplate(capture, this.loc);
			} else if(capture.startsWith(LOCALIZADED_STRING_FLAG)){
				return this.processarMatchLocString(capture, this.loc);
			}
			else {
				return this.processarMatchString(capture);
			}
		}

		prepararVariaveisAngular(angularObjects){
			var angularObjectsString = "";
			for (var key in angularObjects){
				angularObjectsString += `$scope.${key}=${JSON.stringify(angularObjects[key])};\n`;
			}
			return angularObjectsString;
		}
		
	}

	var FILE_SUFFIX = ".html";
	var REGEX_TEMPLATE_SERVICE = /\^(\S*)\^/gm;
	var TEMPLATE_FLAG = "tmp_";
	var LOCALIZADED_STRING_FLAG = "loc_";
	var TEMPLATE_PATH = "./views/templates/";
	var STRINGS_FILES_PATH = "./strings/";

	

	module.exports = TemplateService