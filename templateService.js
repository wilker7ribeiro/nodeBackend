var fs = require('fs');
var loc = 'pt-BR'
//function TemplateService(loc) {
	var REGEX_TEMPLATE_SERVICE = /\^(\S*)\^/gm;
	var TEMPLATE_FLAG = "tmp_";
	var LOCALIZADED_STRING_FLAG = "loc_";
	var TEMPLATE_PATH = "./views/templates/";
	var STRINGS_FILES_PATH = "./strings/";
	var listaStringsSalvas = {};
	var FILE_SUFFIX = ".html";
	
//}


var getArquivoStrings= function (loc){
	try{
		var jsonStrings = fs.readFileSync(STRINGS_FILES_PATH+loc+".json");
	} catch(err){

		var jsonStrings = fs.readFileSync(STRINGS_FILES_PATH+"pt_BR"+".json");
	}
	return jsonStrings;
}

var carregarPagina = function (path, cb){
	try {
		var content = fs.readFileSync(path).toString();
	} catch (err){
		cb(err)

	}
	content = content.replace(REGEX_TEMPLATE_SERVICE, replaceAuto);

	cb(null,content);
}

var processarTemplate = function (flag, path, loc){
	flag = flag.substring(4, flag.length);
	var path = flag.replace(/=/g,"/");
	try {
		var content = fs.readFileSync(TEMPLATE_PATH+path+FILE_SUFFIX).toString();
	} catch (err){
		return "^"+path+"^"
	}
	content = content.replace(REGEX_TEMPLATE_SERVICE, replaceAuto);
	return content;
}


var replaceAuto = function(match, capture){
	var flag = capture.substring(1);
	if(capture.startsWith(TEMPLATE_FLAG)){
		return processarMatchTemplate(capture, loc)
	} else if(capture.startsWith(LOCALIZADED_STRING_FLAG)){
		return processarMatchLocString(capture, loc)
	}
	else {
		return processarMatchString(capture)
	}
}


var processarMatchTemplate = function(flag, loc){
	return processarTemplate(flag, loc);
}

var processarMatchLocString = function(flag, loc){
	flag = flag.substring(4, flag.length);
        //System.out.println(loc);
        return getArquivoStrings(loc)[flag.toUpperCase()] || flag
    }

    var processarMatchString = function(flag){
    	console.log(flag)
    	return listaStringsSalvas[flag] || flag;
    }
    
    var prepararVariaveisAngular = function(angularObjects){
    	var angularObjectsString = "";
    	for (key in angularObjects){
    		angularObjectsString += `$scope.${key}=${JSON.stringify(angularObjects[key])};\n`;
    	}
    	return angularObjectsString;
    }

module.exports = function (filePath, options, callback) { // define the template engine

	listaStringsSalvas.angular_objects = prepararVariaveisAngular({
			teste:123,
			arrayobjs:[{obj1:1},{obj2:2}],
			string:"4123",
			obj:{nome:"nome", pessoa:"teste"}
		})

	carregarPagina(filePath, function(err, content){
		if (err){
			return callback(err)
		}
		
		return callback(null,content)
	})

}

