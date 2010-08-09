rb_classes.String = function(value)
{
  this.class_name = 'String';
  this.value = value.toString();
}

rb_classes.String.prototype = new rb_class();

rb_classes.String.prototype.toString = function() {
  return '"' + this.value.replace(/\"/g, '\\"') + '"'
}

rb_classes.String.prototype.methods = {
  '+': function(other) { return new rb_classes.String(this.value + other.value); },
  '*': function(other) { return new rb_classes.String(this.value * other.value); },
  
  'to_s': function() { return new rb_classes.String(this.value); },
  'to_i': function() { return new rb_classes.Integer(this.value); },
  'to_f': function() { return new rb_classes.Float(this.value); }
}

