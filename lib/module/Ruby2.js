var rb_native_classes = {};

var rb_def_native_class = function(class_name)
{
  rb_native_classes[class_name] = {
    class_name: class_name,
    methods: []
  }
}

var rb_def_native_method = function(class_name, method_name, func) {
  rb_native_classes[class_name]['methods'][method_name] = func;
}

