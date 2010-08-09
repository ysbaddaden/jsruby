rb_classes.Float = function(value)
{
  this.class_name = 'Float';
  this.value = (typeof value == 'string') ? parseFloat(value) : value;
}

rb_classes.Float.prototype = new rb_class();

rb_classes.Float.prototype.toString = function() {
  return ((parseInt(this.value) != this.value) ? this.value : this.value + '.0').toString();
}

rb_classes.Float.prototype.methods = {
  '-': function(other) { return new rb_classes.Float(this.value - other.value) },
  '+': function(other) { return new rb_classes.Float(this.value + other.value) },
  '*': function(other) { return new rb_classes.Float(this.value * other.value) },
  '/': function(other) { return new rb_classes.Float(this.value / other.value) },
  
  '>': function(other) { return rb_bool(this.value > other.value) },
  '<': function(other) { return rb_bool(this.value < other.value) },
  '==': function(other) {
     return rb_bool(this.class_name == other.class_name && this.value === other.value);
  },
  '<=>': function(other)
  {
    if      (this.value > other.value)  return new rb_classes.Integer(1);
    else if (this.value == other.value) return new rb_classes.Integer(0);
    else if (this.value < other.value)  return new rb_classes.Integer(-1);
  },
  
  'to_s': function() { return new rb_classes.String(this.value) },
  'to_i': function() { return new rb_classes.Integer(this.value) },
  'to_f': function() { return new rb_classes.Float(this.value) }
}

