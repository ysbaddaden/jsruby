var sys = require('sys');
var fs = require('fs');

var Ruby = require(__dirname + '/module/Ruby');

var seq = Ruby.YARVInstructionSequence.loadFromFile(process.argv[2]);
sys.puts(seq.run());

