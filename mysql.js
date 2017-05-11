//const express = require('express');
"use strict";
var SQLString = require('./sqlInstructionMount')
var mysql     =    require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'teste',
    debug    :  false
  });



var getConnection = function(cb){
	pool.getConnection(function(err,connection){
		if (err) {
			console.log(err)
			connection.release();
			cb(err,connection);
			//
			return;
		}
		//console.log('connected as id ' + connection.threadId);
		cb(err, connection);

		connection.on('error', function(err) {
			console.log(err)
			cb(err,connection);
			console.log('Error in na query');
			//res.json({"code" : 100, "status" : "Error in connection database"});
			return;
		});
	})
}



var executarQuery = function(instrucao, argumentos , cb){
	getConnection(function(err,connection){
		connection.query(instrucao, argumentos, function(err,rows){
			connection.release();
			if(!err) {
				cb(err, rows);
			}
			else{
				cb(err, rows);
				console.log(err)
			}
		});
	})
}


var getAll = function(tabela, cb){
	executarQuery("select * from ??", tabela,function(err, data){
		cb(err, data)
	})
}

var getAllWhere = function(tabela,value , cb){
	executarQuery("select * from ?? where ?", [tabela, value],function(err, data){
		cb(err, data)
	})
}

var sqlString = new SQLString();
sqlString.select('*').from('user', 'u').join('pessoa', 'p').on("u.iduser = p.iduser").where({'u.iduser': 1});
console.log(mysql.format(sqlString.string, sqlString.argumentos))

executarQuery(sqlString.string , sqlString.argumentos, function(err, data){
	console.log(data)
})

/*getAllWhere("user", {iduser:1}, function(err, user){
	console.log(user);
})*/


/*getAll("user",function(err, users){
	console.log(users)
})*/




/*executarInstrucao(query, (function(data){
	console.log(data)
	console.log(data[0])
	console.log(Object.getPrototypeOf(data[0]))
}))*/

