var Ruby = require('Ruby');

exports.nil_test = function(test)
{
  test.expect(3);
  test.same(Ruby.eval("a = nil ; b = a"), Ruby.Objects['nil']);
  test.done();
}

