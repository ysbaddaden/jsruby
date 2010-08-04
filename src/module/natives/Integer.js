rb_classes.Integer = function(value)
{
  this.class_name = 'Integer';
  this.value = (typeof value == 'string') ? parseInt(value, 10) : value;
}
rb_classes.Integer.prototype = new rb_class();

rb_classes.Integer.prototype.toString = function() {
  return this.value.toString();
}

rb_classes.Integer.prototype.methods = {
  '-': function(self, args) { return new rb_classes.Integer(self.value - args[0].value); },
  '-@': function(self) { return new rb_classes.Integer(-self.value); },
  '+': function(self, args) { return new rb_classes.Integer(self.value + args[0].value); },
  '*': function(self, args) { return new rb_classes.Integer(self.value * args[0].value); },
  '/': function(self, args) { return new rb_classes.Integer(self.value / args[0].value); },
  '**': function(self, args) { return new rb_classes.Float(Math.pow(self.value, args[0].value)); },
  
  'quo': function(self, args) { return new rb_classes.Float(self.value / args[0].value); },
  
  '%': function(self, args) { return new rb_classes.Integer(self.value % args[0].value); },
  
  '>': function(self, args) {
    return (self.value > args[0].value) ? rb_objects['true'] : rb_objects['false'];
  },
  '>=': function(self, args) {
    return (self.value >= args[0].value) ? rb_objects['true'] : rb_objects['false'];
  },
  '<': function(self, args) {
    return (self.value < args[0].value) ? rb_objects['true'] : rb_objects['false'];
  },
  '<=': function(self, args) {
    return (self.value <= args[0].value) ? rb_objects['true'] : rb_objects['false'];
  },
  '==': function(self, args)
  {
    return (typeof args[0].value == 'number' && self.value === args[0].value) ?
      rb_objects['true'] : rb_objects['false'];
  },
  '<=>': function(self, args)
  {
    if (self.value > args[0].value) return new rb_classes.Integer(1);
    else if (self.value == args[0].value) return new rb_classes.Integer(0);
    else if (self.value < args[0].value) return new rb_classes.Integer(-1);
  },
  
  '<<': function(self, args) { return new rb_classes.Integer(self.value << args[0].value); },
  '>>': function(self, args) { return new rb_classes.Integer(self.value >> args[0].value); },
  '&':  function(self, args) { return new rb_classes.Integer(self.value & args[0].value); },
  '|':  function(self, args) { return new rb_classes.Integer(self.value | args[0].value); },
  '^':  function(self, args) { return new rb_classes.Integer(self.value ^ args[0].value); },
  '~':  function(self) { return new rb_classes.Integer(~ self.value); },
  //'[]': function(self, args) {  },
  
  'abs':   function(self) { return new rb_classes.Integer(Math.abs(self.value)); },
  'zero?': function(self) { (self.value == 0) ? rb_objects['true'] : rb_objects['false']; },
  'next':  function(self) { return new rb_classes.Integer(self.value + 1); },
  
  'to_s': function(self, args)
  {
    //console.log(args[0]);
    return new rb_classes.String(parseInt(self.value, args[0] || 10));
  },
  'to_i': function(self) { return new rb_classes.Integer(self.value); },
  'to_f': function(self) { return new rb_classes.Float(self.value); },
  
//  'times': function(self, args, block)
//  {
//    while(args[0]--) {
//      block.run();
//    }
//  }
}

