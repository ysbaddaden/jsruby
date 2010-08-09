var sys = require('sys');
var child_process = require('child_process');

sys.debug('A');

  child_process.exec('echo "nil" | ruby /home/julien/work/github/ruby/jsruby/lib/compile.rb', function(error, stdout, stderr)
  {
    sys.debug(stdout);
    sync = false;
  });

sys.debug('B');

