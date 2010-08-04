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
  '-': function(other)  { return new rb_classes.Integer(this.value - other.value); },
  '-@': function()      { return new rb_classes.Integer(-this.value); },
  '+': function(other)  { return new rb_classes.Integer(this.value + other.value); },
  '*': function(other)  { return new rb_classes.Integer(this.value * other.value); },
  '/': function(other)  { return new rb_classes.Integer(this.value / other.value); },
  '**': function(other) { return new rb_classes.Float(Math.pow(this.value, other.value)); },
  
  'quo': function(other) { return new rb_classes.Float(this.value / other.value); },
  
  '%': function(other) { return new rb_classes.Integer(this.value % other.value); },
  
  '>':  function(other) { return rb_bool(this.value > other.value) },
  '>=': function(other) { return rb_bool(this.value >= other.value) },
  '<':  function(other) { return rb_bool(this.value < other.value) },
  '<=': function(other) { return rb_bool(this.value <= other.value) },
  '==': function(other) {
    return rb_bool(typeof other.value == 'number' && this.value === other.value);
  },
  '<=>': function(other)
  {
    if      (this.value > other.value)  return new rb_classes.Integer(1);
    else if (this.value == other.value) return new rb_classes.Integer(0);
    else if (this.value < other.value)  return new rb_classes.Integer(-1);
  },
  
  '<<': function(other) { return new rb_classes.Integer(this.value << other.value); },
  '>>': function(other) { return new rb_classes.Integer(this.value >> other.value); },
  '&':  function(other) { return new rb_classes.Integer(this.value & other.value); },
  '|':  function(other) { return new rb_classes.Integer(this.value | other.value); },
  '^':  function(other) { return new rb_classes.Integer(this.value ^ other.value); },
  '~':  function() { return new rb_classes.Integer(~ this.value); },
  
  //'[]': function(index) {  },
  
  'abs':   function() { return new rb_classes.Integer(Math.abs(this.value)); },
  'zero?': function() { (this.value == 0) ? rb_objects['true'] : rb_objects['false']; },
  'next':  function() { return new rb_classes.Integer(this.value + 1); },
  
  'to_s': function(base) {
    return new rb_classes.String(parseInt(this.value, base || 10));
  },
  'to_i': function() { return new rb_classes.Integer(this.value); },
  'to_f': function() { return new rb_classes.Float(this.value); },
  
//  'times': function(count, block)
//  {
//    while(other--) {
//      block.run();
//    }
//  }
}

