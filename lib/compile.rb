raise "Ruby 1.9 is required." unless RUBY_VERSION =~ /^1\.9\./
require 'json'

def set_putfloat(opcodes)
  opcodes.map do |opcode|
    if opcode.is_a?(Array)
      if opcode[0] == :putiseq
        opcode[13] = set_putfloat(opcode[13])
      elsif opcode[0] == :putobject && opcode[1].is_a?(Float)
        opcode[0] = :putfloat
      end
    end
    
    opcode
  end
end

RubyVM::InstructionSequence.compile_option = {
  :peephole_optimization    => true,
  :inline_const_cache       => false,
  :specialized_instruction  => false,
  :operands_unification     => false,
  :instructions_unification => false,
  :stack_caching            => false,
}
iseq = RubyVM::InstructionSequence.compile_file(ARGV[0]).to_a
iseq[13] = set_putfloat(iseq[13])
puts iseq.to_json

