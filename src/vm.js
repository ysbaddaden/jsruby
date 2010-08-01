/*
Ruby = {}
Ruby.Constants = {}
Ruby.Kernel = {}

Ruby.NativeObject = function(class_name, options = {}, methods = {})
{
  Ruby.Constants[name] = {
    class_name: class_name,
    instanciable: options[instanciable] || true,
    methods: methods
  };
}

Ruby.NativeClass();

new Ruby.Object('NilClass', { instanciable: false },
{
  
});

Ruby.nilObject   = new Ruby.NativeClass('NilClass');
Ruby.trueObject  = new Ruby.NativeClass('TrueClass');
Ruby.falseObject = new Ruby.NativeClass('FalseClass');
*/
