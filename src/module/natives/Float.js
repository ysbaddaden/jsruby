rb_classes['Float'] = function(value)
{
  this.class_name = 'Float';
  this.value = (typeof value == 'string') ? parseFloat(value) : value;
}

rb_classes['Float'].prototype = new rb_class();

rb_classes['Float'].prototype.toString = function() {
  return 'nil';
}

rb_classes['Float'].prototype.toString = function() {
  return ((parseInt(this.value) != this.value) ? this.value : this.value + '.0').toString();
}

rb_classes['Float'].prototype.methods = {
  '-': function(self, args) { return new rb_classes['Float'](self.value - args[0].value); },
  '+': function(self, args) { return new rb_classes['Float'](self.value + args[0].value); },
  '*': function(self, args) { return new rb_classes['Float'](self.value * args[0].value); },
  '/': function(self, args) { return new rb_classes['Float'](self.value / args[0].value); },
  
  '>': function(self, args) {
     return (self.value > args[0].value) ? rb_objects['true'] : rb_objects['false'];
  },
  '<': function(self, args) {
     return (self.value < args[0].value) ? rb_objects['true'] : rb_objects['false'];
  },
  '==': function(self, args)
  {
     return (self.class_name == args[0].class_name && self.value === args[0].value) ?
      rb_objects['true'] : rb_objects['false'];
  },
  '<=>': function(self, args)
  {
    if (self.value > args[0].value) return new rb_classes['Integer'](1);
    else if (self.value == args[0].value) return new rb_classes['Integer'](0);
    else if (self.value < args[0].value) return new rb_classes['Integer'](-1);
  },
  
  'to_s': function(self) { return new rb_classes['String'](self.value); },
  'to_i': function(self) { return new rb_classes['Integer'](self.value); },
  'to_f': function(self) { return new rb_classes['Float'](self.value); }
}

