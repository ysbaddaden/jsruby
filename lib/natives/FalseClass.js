rb_classes['FalseClass'] = function()
{
  this.class_name = 'FalseClass';
  this.value = false;
}

rb_classes['FalseClass'].prototype = new rb_class();

rb_classes['FalseClass'].prototype.toString = function() {
  return 'false'
}

rb_classes['FalseClass'].prototype.methods = {
  '!': function() { return rb_objects['true']; },
  '&&': function(other) { return rb_objects['false']; },
  '||': function(other) { return rb_bool(this.value || other.value); },
};

