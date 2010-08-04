var sys = require('sys');
var fs = require('fs');
var path = require('path');

sys.puts(sys.inspect(path.join(__dirname, 'natives')))

fs.readdir(path.join(__dirname, 'natives'), function(err, file_names)
{
  file_names.forEach(function(file_name)
  {
    if (file_name.match(/\.js$/))
    {
      process.compile(fs.readFile(file_name, 'ascii'), file_name);
    }
  });
});

