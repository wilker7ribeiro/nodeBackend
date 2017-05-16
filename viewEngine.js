"use strict"
var TemplateService = require("./TemplateService")

var cache = require('memory-cache');
var cacheEnabled = true;
var cacheTimeout = 1000 * 60 * 20 //20min

function getCache(path){
	for (var i = 0; i < cache.length; i++) {
		if(cache[i].path == path) return cache[i];
	}
	return false;
}


//COM CACHE
module.exports = function (filePath, options, callback) { // define the template engine
	var templateService = new TemplateService()

	templateService.listaStringsSalvas.angular_objects = templateService.prepararVariaveisAngular({
		teste:123,
		arrayobjs:[{obj1:1},{obj2:2}],
		string:"4123",
		obj:{nome:"nome", pessoa:"teste"}
	})
	
	var cached = cache.get(filePath);
	if(cached){
		return callback(null,cached)
	} 
	else {
		templateService.carregarPagina(filePath, function(err, content){
			if (err){
				return callback(err)
			}
			cache.put(filePath, content, cacheTimeout);
			return callback(null,content)
		})
	}
}


//SEM CACHE
 var x = function (filePath, options, callback) { // define the template engine
	var templateService = new TemplateService()

	/*templateService.listaStringsSalvas.angular_objects = templateService.prepararVariaveisAngular({
		teste:123,
		arrayobjs:[{obj1:1},{obj2:2}],
		string:"4123",
		obj:{nome:"nome", pessoa:"teste"}
	})*/

	templateService.carregarPagina(filePath, function(err, content){
		if (err){
			return callback(err)
		}
		return callback(null,content)
	})

}