rb_classes['TrueClass'] = function()
{
  this.class_name = 'TrueClass';
  this.value = true;
};

rb_classes['TrueClass'].prototype = new rb_class();

rb_classes['TrueClass'].prototype.toString = function() {
  return 'true'
};

rb_classes['TrueClass'].prototype.methods = {
  '!': function() { return rb_objects['false']; },
  '&&': function(other) { return rb_bool(this.value && other.value); },
  '||': function(other) { return rb_objects['true']; },
};

