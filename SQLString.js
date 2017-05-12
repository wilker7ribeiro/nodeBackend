"use strict";
var mysql     =    require('mysql');

function SQLString(stringInicial, argumentos) {

  this.string = stringInicial || '';
  this.argumentos = argumentos || [];
}

var isString = function(data){
	return (typeof data);
}

var isObj = function(data){
	return (typeof data);
}


SQLString.prototype.select = function(args) {
	if(Array.isArray(args)){
		this.string += `SELECT ${args.join(', ')} `;
	}else {
		args = args || "*";
		this.argumentos.push(args);
		this.string += 'SELECT ?? ';

	}
	
	
	
	return this;
};



SQLString.prototype.from = function(args, apelido) {
	apelido = apelido ? apelido+' ' : '';
	this.string += `FROM ?? ${apelido}`;
	this.argumentos.push(args);
	return this;
};

SQLString.prototype.union = function() {
	//args = args || "*";
	this.string += `UNION `;
	//this.argumentos.push(args);
	return this;
};

SQLString.prototype.unionAll = function() {
	//args = args || "";
	this.string += `UNION `;
	//this.argumentos.push(args);
	return this;
};

SQLString.prototype.join = function(args, apelido) {
	apelido = apelido ? apelido+' ' : '';
	this.string += `JOIN ?? ${apelido}`;
	this.argumentos.push(args);
	return this;
};

SQLString.prototype.innerJoin = function(args, apelido) {
	apelido = apelido ? apelido+' ' : '';
	this.string += `INNER JOIN ?? ${apelido}`;
	this.argumentos.push(args);
	return this;
};

SQLString.prototype.leftJoin = function(args, apelido) {
	apelido = apelido ? apelido+' ' : '';
	this.string += `LEFT JOIN ?? ${apelido}`;
	this.argumentos.push(args);
	return this;
};

SQLString.prototype.rightJoin = function(args, apelido) {
	apelido = apelido ? apelido+' ' : '';
	this.string += `RIGHT JOIN ?? ${apelido}`;
	this.argumentos.push(args);
	return this;
};

SQLString.prototype.outerJoin = function(args, apelido) {
	apelido = apelido ? apelido+' ' : '';
	this.string += `OUTER JOIN ?? ${apelido}`;
	this.argumentos.push(args);
	return this;
};

SQLString.prototype.on = function(args) {
	this.string += `ON ${args} ` ;
	return this;
};


SQLString.prototype.where = function(args) {
	this.string += 'WHERE ? ' ;
	this.argumentos.push(args);
	return this;
};

SQLString.prototype.and = function(args) {
	this.string += 'AND ??' ;
	this.argumentos.push(args);
	return this;
};
// export the class
module.exports = SQLString;