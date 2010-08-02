var fs = require('fs');
var Ruby = {};

Ruby.Classes = {}

Ruby.Classes.NilClass = function() {}
Ruby.Classes.NilClass.prototype.CLASS_NAME = 'NilClass';
Ruby.Classes.NilClass.prototype.toString = function() { return 'nil' }

Ruby.Classes.TrueClass = function() {}
Ruby.Classes.TrueClass.prototype.CLASS_NAME = 'TrueClass';
Ruby.Classes.TrueClass.prototype.toString = function() { return 'true' }

Ruby.Classes.FalseClass = function() {}
Ruby.Classes.FalseClass.prototype.CLASS_NAME = 'FalseClass';
Ruby.Classes.FalseClass.prototype.toString = function() { return 'false' }

Ruby.Classes.Integer = function(value) { this.value = value; }
Ruby.Classes.Integer.prototype.CLASS_NAME = 'Integer';
Ruby.Classes.Integer.prototype.toString = function() { return this.value.toString() }

Ruby.Classes.Float = function(value) { this.value = value; }
Ruby.Classes.Float.prototype.CLASS_NAME = 'Float';
Ruby.Classes.Float.prototype.toString = function() {
  return ((parseInt(this.value) != this.value) ? this.value : this.value + '.0').toString();
}

Ruby.Classes.String = function(value) { this.value = value; }
Ruby.Classes.String.prototype.CLASS_NAME = 'String';
Ruby.Classes.String.prototype.toString = function() { return '"' + this.value.replace(/\"/g, '\\"') + '"' }

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
  
//  console.log(JSON.stringify(iseq[13]));
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
  var skip_to_label;
  var registers = [];
  var locals = [];
//  var locals = new Array(this.options.local_size);
//  var lp = this.options.local_size - iseq[10].length;
  
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

//    console.log(JSON.stringify(opcode));
    
    switch (opcode[0])
    {
      case 'trace': continue;
      case 'leave':
        this.debugLocals(locals);
        return registers.pop();
      case 'setlocal':  locals[opcode[1]] = registers.pop(); break;
      case 'getlocal':  registers.push(locals[opcode[1]]); break;
      case 'dup':       registers.push(registers[registers.length - 1]); break;
      case 'putnil':    registers.push(Ruby.Objects['nil']); break;
      case 'putstring': registers.push(new Ruby.Classes.String(opcode[1])); break;
      case 'putfloat':  registers.push(new Ruby.Classes.Float(opcode[1])); break;
      case 'putobject':
        switch (typeof opcode[1])
        {
          case 'boolean': registers.push(Ruby.Objects[opcode[1].toString()]); break;
          case 'number':  registers.push(new Ruby.Classes.Integer(opcode[1])); break;
          //case 'string':  registers.push(new Ruby.Classes[[opcode[1]]); break;
          default:
            throw new Error("Unsupported putobject type: " + typeof(opcode[1]));
        }
      break;
      
      case 'branchunless':
        if (Ruby.isFalse(registers.pop())) {
          skip_to_label = opcode[1];
        }
      break;
      
      default:
        console.log(JSON.stringify(opcode));
    }
    
//    console.log(registers); console.log(locals); console.log("");
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

var code = Ruby.loadYARVInstructionSequenceFromFile(process.argv[2]);
console.log(code.run());

