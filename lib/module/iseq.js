// YARVInstructionSequence

//method_name = iseq[9];
var YARVInstructionSequence = function(iseq)
{
  this.iseq = iseq;
  this.options = iseq[4];
  this.version = this.iseq.slice(1, 4).join('.');
  
  if (this.version != "1.2.1") {
    console.warn("Unsupported YARVInstructionSequence version. There might be errors.");
  }
  
//  console.log(JSON.stringify(iseq[13]));
}

YARVInstructionSequence.loadFromFile = function(file_name)
{
  var iseq = JSON.parse(fs.readFileSync(file_name, 'ascii'));
  
  if (iseq[0] != 'YARVInstructionSequence/SimpleDataFormat') {
    throw new Error("Not a YARVInstructionSequence.");
  }
  return new YARVInstructionSequence(iseq);
}

//YARVInstructionSequence.relative_file_name = function() {
//  return this.iseq[6];
//}
//YARVInstructionSequence.absolute_file_name = function() {
//  return this.iseq[7];
//}

YARVInstructionSequence.prototype.run = function()
{
  //local_vars = iseq[10];
  //args_count = iseq[11];
  //args = iseq[12];
  
  var opcodes = this.iseq[13];
  var lineno = 0;
  var skip_to;
  var registers = [];
  var locals = [];
  var labels = [];
  
  for (var i=0; i<opcodes.length; i++)
  {
    var opcode = opcodes[i];
    
    function jump(label)
    {
      if (typeof labels[label] != 'undefined') {
        i = labels[label]; // known label (jumps to label + 1)
      }
      else {
        skip_to = label; // unknown label (skips next operands until we find it)
      }
    }
    
    // line number
    if (typeof opcode == 'number')
    {
      lineno = opcode;
      continue;
    }
    
    // label
    if (typeof opcode == 'string')
    {
      labels[opcode] = i
      if (opcode == skip_to) {
        skip_to = undefined;
      }
      continue;
    }
    else if (skip_to) {
      continue;
    }
    
//    console.log(JSON.stringify(opcode));
    
    switch (opcode[0])
    {
      case 'trace':
        break;
      
      case 'leave':
        this.debugLocals(locals);
        return registers.pop();
      
      case 'setlocal':
        locals[opcode[1]] = registers.pop();
        break;
      
      case 'getlocal':
        registers.push(locals[opcode[1]]);
        break;
      
      // FIXME: 'dup' doesn't really duplicates the value, but creates a reference to it.
      case 'dup':
        //registers.push(registers[registers.length - 1].dup());
        registers.push(registers[registers.length - 1]);
        break;
      
      case 'pop':
        registers.pop();
        break;
      
      case 'putnil':
        registers.push(rb_objects['nil']);
        break;
      
      case 'putstring':
        registers.push(new rb_classes['String'](opcode[1]));
        break;
      
      case 'putfloat':
        registers.push(new rb_classes['Float'](opcode[1]));
        break;
      
      case 'putobject':
        switch (typeof opcode[1])
        {
          case 'boolean':
            registers.push(rb_objects[opcode[1].toString()]);
            break;
          case 'number':
            registers.push(new rb_classes['Integer'](opcode[1]));
            break;
          //case 'string':
          //  registers.push(new rb_classes[[opcode[1]]);
          //  break;
          default:
            throw new Error("Unsupported putobject type: " + typeof(opcode[1]));
        }
        break;
      
      case 'branchunless':
        if (rb_is_false(registers.pop())) {
          jump(opcode[1]);
        }
        continue;
      
      case 'branchif':
        if (rb_is_true(registers.pop())) {
          jump(opcode[1]);
        }
        continue;
      
      case 'jump':
        jump(opcode[1]);
        continue;
      
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
        sys.inspect(opcode);
    }
    
//    console.log(registers); console.log(locals); console.log("");
  }
}

YARVInstructionSequence.prototype.debugLocals = function(locals)
{
  var names = this.iseq[10];
  for (var i=0; i<names.length; i++) {
    console.log(names[i] + ' = ' + locals[locals.length - i - 1]);
  }
}

exports.YARVInstructionSequence = YARVInstructionSequence;

