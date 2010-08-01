var fs = require('fs');
var Ruby = {};

Ruby.Classes = {}
Ruby.Classes.NilClass = function() {}
Ruby.Classes.NilClass.prototype.CLASS_NAME = 'NilClass';
Ruby.Classes.NilClass.prototype.toString = function() { return this.CLASS_NAME }

Ruby.Classes.TrueClass = function() {}
Ruby.Classes.TrueClass.prototype.CLASS_NAME = 'TrueClass';
Ruby.Classes.TrueClass.prototype.toString = function() { return this.CLASS_NAME }

Ruby.Classes.FalseClass = function() {}
Ruby.Classes.FalseClass.prototype.CLASS_NAME = 'FalseClass';
Ruby.Classes.FalseClass.prototype.toString = function() { return this.CLASS_NAME }

Ruby.Objects = {
  'nil':   new Ruby.Classes.NilClass(),
  'true':  new Ruby.Classes.TrueClass(),
  'false': new Ruby.Classes.FalseClass()
};

Ruby.loadYARVInstructionSequenceFromFile = function(file_name)
{
  var iseq = JSON.parse(fs.readFileSync(file_name, 'ascii'));
  
  if (iseq[0] != 'YARVInstructionSequence/SimpleDataFormat') {
    throw new Error("Not a YARVInstructionSequence.");
  }
  return new Ruby.YARVInstructionSequence(iseq);
}

//method_name = iseq[9];
Ruby.YARVInstructionSequence = function(iseq)
{
  this.iseq = iseq;
  this.options = iseq[4];
  this.version = this.iseq.slice(1, 4).join('.');
  
  if (this.version != "1.2.1") {
    console.warn("Unsupported YARVInstructionSequence version. There might be errors.");
  }
}

Ruby.YARVInstructionSequence.relative_file_name = function() { return this.iseq[6]; }
Ruby.YARVInstructionSequence.absolute_file_name = function() { return this.iseq[7]; }
Ruby.YARVInstructionSequence.prototype.run = function()
{
  //local_vars = iseq[10];
  //args_count = iseq[11];
  //args = iseq[12];
  
  var opcodes = this.iseq[13];
  var lineno = 0;
  var registers = [];
  var locals = [];
  var skip_to_label;
  
  console.log(JSON.stringify(opcodes));
  
  for (var i=0; i<opcodes.length; i++)
  {
    var opcode = opcodes[i];
    
    // line number
    if (typeof opcode == 'number') { lineno = opcode; continue; }
    
    // label
    if (typeof opcode == 'string')
    {
      if (opcode == skip_to_label) {
        skip_to_label = undefined;
      }
      continue;
    }
    else if (skip_to_label) {
      continue;
    }
    
    switch (opcode[0])
    {
      case 'trace':     continue;
      case 'leave':     this.debugLocals(locals); return registers.pop();
      case 'setlocal':  locals[opcode[1]] = registers.pop(); break;
      case 'getlocal':  registers.push(locals[opcode[1]]); break;
      case 'dup':       registers.push(registers[registers.length - 1]); break;
      case 'putnil':    registers.push(Ruby.Objects['nil']); break;
      case 'putobject': registers.push(Ruby.Objects[opcode[1].toString()]); break;
      case 'branchunless':
        if (Ruby.isFalse(registers.pop())) {
          skip_to_label = opcode[1];
        }
      break;
      
      default:
        console.log(JSON.stringify(opcode));
    }
    
//    console.log(JSON.stringify(opcode)); console.log(registers); console.log(locals); console.log("");
  }
}

Ruby.YARVInstructionSequence.prototype.debugLocals = function(locals)
{
  var names = this.iseq[10];
  for (var i=0; i<names.length; i++) {
    console.log(names[i] + ' = ' + locals[locals.length - i - 1]);
  }
}

Ruby.isFalse = function(v) {
  return (v == Ruby.Objects['nil'] || v == Ruby.Objects['false']);
}

var rs = Ruby.loadYARVInstructionSequenceFromFile(process.argv[2]).run();

console.log(rs.CLASS_NAME);

