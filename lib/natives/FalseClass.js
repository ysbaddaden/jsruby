rb_classes['FalseClass'] = function()
{
  this.class_name = 'FalseClass';
  this.value = false;
}

rb_classes['FalseClass'].prototype = new rb_class();

rb_classes['FalseClass'].prototype.toString = function() {
  return 'false'
}

