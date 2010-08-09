rb_classes['TrueClass'] = function()
{
  this.class_name = 'TrueClass';
  this.value = true;
};

rb_classes['TrueClass'].prototype = new rb_class();

rb_classes['TrueClass'].prototype.toString = function() {
  return 'true'
};

