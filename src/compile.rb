raise "Ruby 1.9 is required." unless RUBY_VERSION =~ /^1\.9\./
require 'json'

RubyVM::InstructionSequence.compile_option = {
  :peephole_optimization    => true,
  :inline_const_cache       => false,
  :specialized_instruction  => false,
  :operands_unification     => false,
  :instructions_unification => false,
  :stack_caching            => false,
}
puts RubyVM::InstructionSequence.compile_file(ARGV[0]).to_a.to_json

