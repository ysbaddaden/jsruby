rb_classes['String'] = function(value)
{
  this.class_name = 'String';
  this.value = value.toString();
}

rb_classes['String'].prototype = new rb_class();

rb_classes['String'].prototype.toString = function() {
  return '"' + this.value.replace(/\"/g, '\\"') + '"'
}

rb_classes['String'].prototype.methods = {
  '+': function(self, args) { return new rb_classes['String'](self.value + args[0].value); },
  '*': function(self, args) { return new rb_classes['String'](self.value * args[0].value); },
  'to_s': function(self) { return new rb_classes['String'](self.value); },
  'to_i': function(self) { return new rb_classes['Integer'](self.value); },
  'to_f': function(self) { return new rb_classes['Float'](self.value); }
}

