var mat4 = require('gl-matrix').mat4;
var constructor = require('./constructor');
var cube_def = require('./shape_defs').cube;
var concat_f32 = require('./utils').concat_f32;

var Renderer = constructor({
  fields: [
    'gl',
    'shader_program',
  ],
  required: [
    'gl',
    'shader_program'
  ],
  defaults: {
  },
  init: function (args) {
    this.vert_arr = this.build_block();
    this.setup_buffers();
    this.setup_attribs();
    this.setup_mats();
    this.setup_uniforms();
  },
});
Renderer.prototype.build_block = function (block) {
  // var child_mv = mat4.create();

  // todo run each face through child_mv
  var face_arrs = [];
  for (let face_arr of cube_def) {
    face_arrs.push(concat_f32.apply(this, face_arr));
  }
  var vert_arr = concat_f32.apply(this, face_arrs);

  return vert_arr;
};
Renderer.prototype.setup_buffers = function () {
  this.vert_buffer = this.gl.createBuffer();
};
Renderer.prototype.setup_attribs = function () {
  this.vert_attrib = this.gl.getAttribLocation(this.shader_program, 'aVert');
};
Renderer.prototype.setup_mats = function () {
  this.persp_mat = mat4.create();
  mat4.perspective(this.persp_mat, Math.PI / 4, this.gl.drawingBufferWidth / this.gl.drawingBufferHeight, 0.1, 1000);
  this.mv_mat = mat4.create();
};
Renderer.prototype.setup_uniforms = function () {
  this.proj_uni = this.gl.getUniformLocation(this.shader_program, 'uProjMat');
  this.mv_uni = this.gl.getUniformLocation(this.shader_program, 'uMVMat');
};

Renderer.prototype.buffer_data = function () {
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vert_buffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vert_arr, this.gl.STATIC_DRAW);
};
Renderer.prototype.set_uniforms = function () {
  this.gl.uniformMatrix4fv(this.proj_uni, false, this.persp_mat);
  this.gl.uniformMatrix4fv(this.mv_uni, false, this.mv_mat);
};
Renderer.prototype.enable_attribs = function () {
  this.gl.enableVertexAttribArray(this.vert_attrib);
};
Renderer.prototype.disable_attribs = function () {
  this.gl.disableVertexAttribArray(this.vert_attrib);
};
Renderer.prototype.draw = function () {
  this.buffer_data();
  this.enable_attribs();

  var gl = this.gl;
  gl.useProgram(this.shader_program);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.vert_buffer);
  gl.vertexAttribPointer(this.vert_attrib, 3, gl.FLOAT, false, 0, 0);
  this.set_uniforms();
  gl.drawArrays(gl.TRIANGLES, 0, this.vert_arr.length / 3);

  this.disable_attribs();
};

module.exports = Renderer;

