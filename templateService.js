var fs = require('fs');

module.exports = function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    // this is an extremely simple template engine
	//console.log(content.toString())
    return callback(null, content.toString())
  })
}