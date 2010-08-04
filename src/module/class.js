// Generic ruby class.
rb_class = function() {}

rb_class.prototype.methods = [];

rb_class.prototype.searchMethod = function(method_name)
{
  if (method_name in this.methods) {
    return this.methods[method_name];
  }
  throw new Error("No such method " + this.class_name + '#' + method_name);
}

rb_class.prototype.callMethod = function(method, args)
{
  //return this.searchMethod(method).call(this, args);
  return (this.searchMethod(method))(this, args);
}

//rb_class.prototype.dup = function()
//{
//}

