require File.dirname(__FILE__) + '/lib/compile.rb'

namespace :compile do
  desc ""
  task :tests do
    Dir[File.dirname(__FILE__) + '/test/*.in'].each do |file|
      # IMPROVE: do not recompile if .inc file is older than .js file
      
      tests = []
      idx = -1
      
      File.readlines(file).each do |line|
        unless line =~ /^$/
          if line =~ /^#>\s*(.*?)\s*:\s*(.*?)$/
            tests[idx += 1] = {
              :name => $2,
              :expect => $1,
              :code => ''
            }
          else
            tests[idx][:code] += line
          end
        end
      end
      
      File.open(file.sub(/\.in$/, '.js'), 'w') do |out|
        tests.each do |test|
          test[:name].gsub!('"', '\"')
          
          test[:json] = JSRuby::Compiler.compile(test[:code]).to_a.to_json
          
          test[:code].strip!
          test[:code].gsub!('"', '\"')
          test[:code].gsub!(/\n/, '\n')
          
          out << "exports[\"#{test[:name]}\"] = function(test) {\n"
          
          case test[:expect]
          when 'nil'
            out << "  test.rb_nil(\"#{test[:code]}\", #{test[:json]});\n"
          end
          
          out <<  "}\n\n"
        end
      end
    end
  end
end

task :test => 'compile:tests' do
  system './test.js'
end

