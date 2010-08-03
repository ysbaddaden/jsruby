var fs = require('fs');
var Ruby = {};

Ruby.Klass = function() {}
Ruby.Klass.prototype.toString = function() {
  return '#<' + this.CLASS_NAME + ' ' + this.value + '>';
}
Ruby.Klass.prototype.callMethod = function(op_id, args)
{
  if (!op_id in this.methods) {
    throw new Error("No such method " + this.CLASS_NAME + '#' + op_id);
  }
  return this.methods[op_id](this, args);
}

Ruby.NilClass = function() {}
Ruby.NilClass.prototype = new Ruby.Klass();
Ruby.NilClass.prototype.CLASS_NAME = 'NilClass';
Ruby.NilClass.prototype.toString = function() { return 'nil' }

Ruby.TrueClass = function() {}
Ruby.TrueClass.prototype = new Ruby.Klass();
Ruby.TrueClass.prototype.CLASS_NAME = 'TrueClass';
Ruby.TrueClass.prototype.toString = function() { return 'true' }

Ruby.FalseClass = function() {}
Ruby.FalseClass.prototype = new Ruby.Klass();
Ruby.FalseClass.prototype.CLASS_NAME = 'FalseClass';
Ruby.FalseClass.prototype.toString = function() { return 'false' }

// TODO: Numeric, Fixnum, Bignum, Rational
Ruby.Integer = function(value) { this.value = parseInt(value); }
Ruby.Integer.prototype = new Ruby.Klass();
Ruby.Integer.prototype.CLASS_NAME = 'Integer';
Ruby.Integer.prototype.toString = function() { return this.value.toString() }
Ruby.Integer.prototype.methods = {
  '-': function(self, args) { return new Ruby.Integer(self.value - args[0].value); },
  '-@': function(self) { return new Ruby.Integer(-self.value); },
  '+': function(self, args) { return new Ruby.Integer(self.value + args[0].value); },
  '*': function(self, args) { return new Ruby.Integer(self.value * args[0].value); },
  '/': function(self, args) { return new Ruby.Integer(self.value / args[0].value); },
  '**': function(self, args) { return new Ruby.Float(Math.pow(self.value, args[0].value)); },
  
  'quo': function(self, args) { return new Ruby.Float(self.value / args[0].value); },
  
  '%': function(self, args) { return new Ruby.Integer(self.value % args[0].value); },
  
  '>': function(self, args) {
    return (self.value > args[0].value) ? Ruby.Objects['true'] : Ruby.Objects['false'];
  },
  '>=': function(self, args) {
    return (self.value >= args[0].value) ? Ruby.Objects['true'] : Ruby.Objects['false'];
  },
  '<': function(self, args) {
    return (self.value < args[0].value) ? Ruby.Objects['true'] : Ruby.Objects['false'];
  },
  '<=': function(self, args) {
    return (self.value <= args[0].value) ? Ruby.Objects['true'] : Ruby.Objects['false'];
  },
  '==': function(self, args)
  {
    return (typeof args[0].value == 'number' && self.value === args[0].value) ?
      Ruby.Objects['true'] : Ruby.Objects['false'];
  },
  '<=>': function(self, args)
  {
    if (self.value > args[0].value) return new Ruby.Integer(1);
    else if (self.value == args[0].value) return new Ruby.Integer(0);
    else if (self.value < args[0].value) return new Ruby.Integer(-1);
  },
  
  '<<': function(self, args) { return new Ruby.Integer(self.value << args[0].value); },
  '>>': function(self, args) { return new Ruby.Integer(self.value >> args[0].value); },
  '&':  function(self, args) { return new Ruby.Integer(self.value & args[0].value); },
  '|':  function(self, args) { return new Ruby.Integer(self.value | args[0].value); },
  '^':  function(self, args) { return new Ruby.Integer(self.value ^ args[0].value); },
  '~':  function(self) { return new Ruby.Integer(~ self.value); },
  //'[]': function(self, args) {  },
  
  'abs':   function(self) { return new Ruby.Integer(Math.abs(self.value)); },
  'zero?': function(self) { (self.value == 0) ? Ruby.Objects['true'] : Ruby.Objects['false']; },
  'next':  function(self) { return new Ruby.Integer(self.value + 1); },
  
  'to_s': function(self, args)
  {
    //console.log(args[0]);
    return new Ruby.String(parseInt(self.value, args[0] || 10));
  },
  'to_i': function(self) { return new Ruby.Integer(self.value); },
  'to_f': function(self) { return new Ruby.Float(self.value); },
  
//  'times': function(self, args, block)
//  {
//    while(args[0]--) {
//      block.run();
//    }
//  }
}

Ruby.Float = function(value) { this.value = parseFloat(value); }
Ruby.Float.prototype = new Ruby.Klass();
Ruby.Float.prototype.CLASS_NAME = 'Float';
Ruby.Float.prototype.toString = function() {
  return ((parseInt(this.value) != this.value) ? this.value : this.value + '.0').toString();
}
Ruby.Float.prototype.methods = {
  '-': function(self, args) { return new Ruby.Float(self.value - args[0].value); },
  '+': function(self, args) { return new Ruby.Float(self.value + args[0].value); },
  '*': function(self, args) { return new Ruby.Float(self.value * args[0].value); },
  '/': function(self, args) { return new Ruby.Float(self.value / args[0].value); },
  
  '>': function(self, args) {
     return (self.value > args[0].value) ? Ruby.Objects['true'] : Ruby.Objects['false'];
  },
  '<': function(self, args) {
     return (self.value < args[0].value) ? Ruby.Objects['true'] : Ruby.Objects['false'];
  },
  '==': function(self, args)
  {
     return (self.CLASS_NAME == args[0].CLASS_NAME && self.value === args[0].value) ?
      Ruby.Objects['true'] : Ruby.Objects['false'];
  },
  '<=>': function(self, args)
  {
    if (self.value > args[0].value) return new Ruby.Integer(1);
    else if (self.value == args[0].value) return new Ruby.Integer(0);
    else if (self.value < args[0].value) return new Ruby.Integer(-1);
  },
  
  'to_s': function(self) { return new Ruby.String(self.value); },
  'to_i': function(self) { return new Ruby.Integer(self.value); },
  'to_f': function(self) { return new Ruby.Float(self.value); }
}

Ruby.String = function(value) { this.value = value.toString(); }
Ruby.String.prototype = new Ruby.Klass();
Ruby.String.prototype.CLASS_NAME = 'String';
Ruby.String.prototype.toString = function() { return '"' + this.value.replace(/\"/g, '\\"') + '"' }
Ruby.String.prototype.methods = {
  '+': function(self, args) { return new Ruby.String(self.value + args[0].value); },
  '*': function(self, args) { return new Ruby.String(self.value * args[0].value); },
  'to_s': function(self) { return new Ruby.String(self.value); },
  'to_i': function(self) { return new Ruby.Integer(self.value); },
  'to_f': function(self) { return new Ruby.Float(self.value); }
}

Ruby.Objects = {
  'nil':   new Ruby.NilClass(),
  'true':  new Ruby.TrueClass(),
  'false': new Ruby.FalseClass()
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

Ruby.YARVInstructionSequence.relative_file_name = function() {
  return this.iseq[6];
}
Ruby.YARVInstructionSequence.absolute_file_name = function() {
  return this.iseq[7];
}

Ruby.YARVInstructionSequence.prototype.run = function()
{
  //local_vars = iseq[10];
  //args_count = iseq[11];
  //args = iseq[12];
  
  var opcodes = this.iseq[13];
  var lineno = 0;
  var skip_to;
  var registers = [];
  var locals = [];
//  var locals = new Array(this.options.local_size);
//  var lp = this.options.local_size - iseq[10].length;
  var labels = [];
  
  for (var i=0; i<opcodes.length; i++)
  {
    var opcode = opcodes[i];
    var jump = function(label)
    {
      if (typeof labels[label] != 'undefined') {
        i = labels[label]; // known label (jumps to label + 1)
      }
      else {
        skip_to = label; // unknown label (skips next operands until we find it)
      }
    }
    
    // line number
    if (typeof opcode == 'number') { lineno = opcode; continue; }
    
    // label
    if (typeof opcode == 'string')
    {
      labels[opcode] = i
      if (opcode == skip_to) { skip_to = undefined; }
      continue;
    }
    else if (skip_to) { continue; }
    
//    console.log(JSON.stringify(opcode));
    
    switch (opcode[0])
    {
      case 'trace': break;
      case 'leave':
//        this.debugLocals(locals);
        return registers.pop();
      
      case 'setlocal':  locals[opcode[1]] = registers.pop(); break;
      case 'getlocal':  registers.push(locals[opcode[1]]); break;
      
      // FIXME: 'dup' doesn't really duplicates the value(?)
      case 'dup': registers.push(registers[registers.length - 1]); break;
      case 'pop': registers.pop(); break;
      
      case 'putnil':    registers.push(Ruby.Objects['nil']); break;
      case 'putstring': registers.push(new Ruby.String(opcode[1])); break;
      case 'putfloat':  registers.push(new Ruby.Float(opcode[1])); break;
      case 'putobject':
        switch (typeof opcode[1])
        {
          case 'boolean': registers.push(Ruby.Objects[opcode[1].toString()]); break;
          case 'number':  registers.push(new Ruby.Integer(opcode[1])); break;
          //case 'string':  registers.push(new Ruby[[opcode[1]]); break;
          default:
            throw new Error("Unsupported putobject type: " + typeof(opcode[1]));
        }
      break;
      
      case 'branchunless': if (Ruby.isFalse(registers.pop())) { jump(opcode[1]); } continue;
      case 'branchif': if (!Ruby.isFalse(registers.pop())) { jump(opcode[1]); } continue;
      case 'jump': jump(opcode[1]); continue;
      
      case 'send': // ['send', op_id, op_argc, blockiseq, op_flag, ic]
        var _args = [];
        if (opcode[2] > 0)
        {
          _args = registers.slice(- opcode[2], registers.length);
          registers = registers.slice(0, registers.length - opcode[2]);
        }
        registers.push(registers.pop().callMethod(opcode[1], _args));
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

