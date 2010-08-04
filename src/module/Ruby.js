// Ruby node module.

var sys = require('sys');
var fs = require('fs');
var path = require('path');

var rb_class, rb_classes = [];

function include(file) {
  eval(fs.readFileSync(path.join(__dirname, file), 'ascii').toString());
}

// Constants
//VM_CALL_ARGS_SPLAT_BIT    = 0x01 << 1
//VM_CALL_ARGS_BLOCKARG_BIT = 0x01 << 2
//VM_CALL_FCALL_BIT         = 0x01 << 3
//VM_CALL_VCALL_BIT         = 0x01 << 4
//VM_CALL_TAILCALL_BIT      = 0x01 << 5
//VM_CALL_TAILRECURSION_BIT = 0x01 << 6
//VM_CALL_SUPER_BIT         = 0x01 << 7
//VM_CALL_OPT_SEND_BIT      = 0x01 << 8

//VM_SPECIAL_OBJECT_VMCORE      = 0x01
//VM_SPECIAL_OBJECT_CBASE       = 0x02
//VM_SPECIAL_OBJECT_CONST_BASE  = 0x03

//VM_FRAME_MAGIC_METHOD = 0x11
//VM_FRAME_MAGIC_BLOCK  = 0x21
//VM_FRAME_MAGIC_CLASS  = 0x31
//VM_FRAME_MAGIC_TOP    = 0x41
//VM_FRAME_MAGIC_FINISH = 0x51
//VM_FRAME_MAGIC_CFUNC  = 0x61
//VM_FRAME_MAGIC_PROC   = 0x71
//VM_FRAME_MAGIC_IFUNC  = 0x81
//VM_FRAME_MAGIC_EVAL   = 0x91
//VM_FRAME_MAGIC_LAMBDA = 0xa1
//VM_FRAME_MAGIC_MASK_BITS = 8
//VM_FRAME_MAGIC_MASK = (~(~0 << VM_FRAME_MAGIC_MASK_BITS))

function rb_is_false(v) {
  return (v == rb_objects['nil'] || v == rb_objects['false']);
}

function rb_is_true(v) {
  return !rb_is_false(v);
}

include('class.js')

include('natives/NilClass.js');
include('natives/TrueClass.js');
include('natives/FalseClass.js');
include('natives/Integer.js');
include('natives/Float.js');
include('natives/String.js');

rb_objects = {
  'nil':   new rb_classes.NilClass(),
  'true':  new rb_classes.TrueClass(),
  'false': new rb_classes.FalseClass()
};

include('iseq.js')

