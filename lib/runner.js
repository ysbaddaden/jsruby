var sys  = require('sys');
var fs   = require('fs');
var Ruby = require('./Ruby');
var iseq = Ruby.YARVInstructionSequence.loadFromFile(process.argv[2]);
sys.puts(iseq.run());

