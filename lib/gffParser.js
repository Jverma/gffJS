/*
Parser for Genome Feature Files (gff).
Converts the contents into a JSON object.
Author - Janu Verma
jv367@cornell.edu
@januverma
*/


var fs = require('fs');
var Stream = require('stream');
var readline = require('readline');


module.exports = parser;

var toObject = function(alpha){
	return{
		seqid: alpha[0],
		source: alpha[1],
		feature: alpha[2],
		start: alpha[3],
		end: alpha[4],
		score: alpha[5],
		strand: alpha[6],
		frame: alpha[7]
}
}


function parser(){
	var gffContents = [];

	var inStream = fs.createReadStream(process.argv[2]);
	var outStream = new Stream();
	var r1 = readline.createInterface(inStream, outStream);

	r1.on('line', function(line){
		var contents = line.split('\t');
		var gffObject = {};
		var gffObject = toObject(contents);
		var attributes = contents[8].split(';');
		attributes.forEach(function(entry){
			var key = entry.split('=')[0];
			var val = entry.split('=')[1];
			gffObject[key] = val;
		});

		gffContents.push(gffObject);
	});

	r1.on('close', function(){
	console.log(JSON.stringify(gffContents));
})
}

