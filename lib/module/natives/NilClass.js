rb_classes.NilClass = function()
{
  this.class_name = 'NilClass';
  this.value = null;
}

rb_classes.NilClass.prototype = new rb_class();

rb_classes.NilClass.prototype.toString = function() {
  return 'nil'
}

