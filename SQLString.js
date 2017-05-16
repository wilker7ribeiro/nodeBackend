"use strict";

class SQLString{
	constructor(stringInicial, argumentos){
		this.string = stringInicial || '';
		this.argumentos = argumentos || [];
	}
	select(args){
		if(Array.isArray(args)){
			this.string += `SELECT ${args.join(', ')} `;
		}else{
			args = args || "*";
			this.argumentos.push(args);
			this.string += 'SELECT ?? ';

		}
		return this;
	};

	from(args, apelido){
		apelido = apelido ? apelido+' ' : '';
		this.string += `FROM ?? ${apelido}`;
		this.argumentos.push(args);
		return this;
	};

	union(){
		//args = args || "*";
		this.string += `UNION `;
		//this.argumentos.push(args);
		return this;
	};

	unionAll(){
		//args = args || "";
		this.string += `UNION `;
		//this.argumentos.push(args);
		return this;
	};

	join(args, apelido){
		apelido = apelido ? apelido+' ' : '';
		this.string += `JOIN ?? ${apelido}`;
		this.argumentos.push(args);
		return this;
	};

	innerJoin(args, apelido){
		apelido = apelido ? apelido+' ' : '';
		this.string += `INNER JOIN ?? ${apelido}`;
		this.argumentos.push(args);
		return this;
	};

	leftJoin(args, apelido){
		apelido = apelido ? apelido+' ' : '';
		this.string += `LEFT JOIN ?? ${apelido}`;
		this.argumentos.push(args);
		return this;
	};

	rightJoin(args, apelido){
		apelido = apelido ? apelido+' ' : '';
		this.string += `RIGHT JOIN ?? ${apelido}`;
		this.argumentos.push(args);
		return this;
	};

	outerJoin(args, apelido){
		apelido = apelido ? apelido+' ' : '';
		this.string += `OUTER JOIN ?? ${apelido}`;
		this.argumentos.push(args);
		return this;
	};

	on(args){
		this.string += `ON ${args} ` ;
		return this;
	};


	where(args){
		this.string += 'WHERE ? ' ;
		this.argumentos.push(args);
		return this;
	};

	and(args){
		this.string += 'AND ??' ;
		this.argumentos.push(args);
		return this;
	};
}

var isString = function (data){
	return (typeof data);
}

var isObj = function (data){
	return (typeof data);
}



// export the class
module.exports = SQLString;