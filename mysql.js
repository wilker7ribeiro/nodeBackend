//const express = require('express');
"use strict";
var SQLString = require('./SQLSTring')
const fs = require('fs');
const mysql     =    require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'teste',
    debug    :  false,
    /*ssl  : {
    	ca : fs.readFileSync('./sslcert/rds-ssl-ca-cert.pem')
    }*/
});

class DBDao {
	constructor(){}
	quit(){
		pool.end()
	}

	getConnection(cb){
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



	executarQuery(instrucao, argumentos , cb){
		this.getConnection(function(err,connection){
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

	count(tabela, cb){
		this.executarQuery("SELECT count(*) FROM ??", tabela,function(err, data){
			cb(err, data)
		})
	}

	getAll(tabela, cb){
		this.executarQuery("SELECT * FROM ??", tabela,function(err, data){
			cb(err, data)
		})
	}

	getAllWhere(tabela,value , cb){
		this.executarQuery("SELECT * FROM ?? WHERE ?", [tabela, value],function(err, data){
			cb(err, data)
		})
	}

	insert(tabela,obj , cb){
		this.executarQuery("INSERT INTO ?? SET  ?", [tabela, obj],function(err, data){
			cb(err, data)
		})
	}

}



var sqlString = new SQLString();
var dao = new DBDao();
sqlString.select(['p.nome', 'p.iduser']).from('pessoa','p');
console.log(sqlString)
console.log(mysql.format(sqlString.string, sqlString.argumentos));

dao.insert('user', {login:'login2', password: 'senha2'}, function(err,user){
	console.log(user)
	dao.getAll('user', function(err,users){
	console.log(users)
})
})


/*dao.executarQuery(sqlString.string , sqlString.argumentos, function(err, data){
	console.log(data);
})*/

dao.count('user', function(err,data){
	console.log(data)
})

//dao.quit()

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

