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
	constructor(idColunaNome){
		this.idColuna = idColunaNome || 'id';
	}
	quit(){
		pool.end();
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
		console.log(mysql.format(instrucao, argumentos));
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
		this.executarQuery(`SELECT count(*) FROM ??`, tabela,function(err, data){
			cb(err, data)
		})
	}

	getAll(tabela, cb){
		this.executarQuery(`SELECT * FROM ??`, tabela,function(err, data){
			cb(err, data)
		})
	}

	getAllWhere(tabela,value , cb){
		this.executarQuery(`SELECT * FROM ?? WHERE ?`, [tabela, value],function(err, data){
			cb(err, data)
		})
	}

	insert(tabela,obj , cb){
		this.executarQuery(`INSERT INTO ?? SET  ?`, [tabela, obj],function(err, data){
			cb(err, data)
		})
	}
	update(tabela,obj,cb){
		var id = obj[`${this.idColuna}`];
		delete obj[`${this.idColuna}`];
		this.executarQuery(`UPDATE ?? SET ? WHERE ${this.idColuna} = ?`, [tabela, obj, id],function(err, data){
			cb(err, data)
		})
	}

	//UPSERT
	save(tabela,obj,cb){
		var objCompleto = JSON.parse(JSON.stringify(obj));
		delete obj[`${this.idColuna}`];
		this.executarQuery(`INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?`, [tabela, objCompleto, obj],function(err, data){
			cb(err, data)
		})
	}

	deleteById(tabela,id,cb){
		this.executarQuery(`DELETE FROM ?? WHERE ${this.idColuna} = ?`, [tabela,id],function(err, data){
			cb(err, data)
		})
	}

	deleteWhere(tabela,where,cb){
		this.executarQuery(`DELETE FROM ?? WHERE ?`, [tabela,where],function(err, data){
			cb(err, data)
		})
	}

}



var sqlString = new SQLString();
var dao = new DBDao();
sqlString.select(['p.nome', 'p.iduser']).from('pessoa','p');
//console.log(sqlString)

/*dao.deleteById('user', 4, function(err, result){
	console.log(result)
	dao.getAll('user', function(err,users){
			console.log(users)
		})
})*/
dao.update('user', {id:9, login:'testeupdate3', password: 'testeupdate2'}, function(err,user){
	dao.getAll('user', function(err,users){
		console.log(users)
	})
})


/*dao.executarQuery(sqlString.string , sqlString.argumentos, function(err, data){
	console.log(data);
})*/

/*dao.count('user', function(err,data){
	console.log(data)
})*/

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

