var constructor = require('./constructor');

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
    this.vert_arr = this.build_verts();
    this.setup_buffers();
    this.setup_attribs();
  },
});
Renderer.prototype.build_verts = function () {
  var vert_arr = new Float32Array([
      0, 0, 0, //m
      0, -1, 0, //bm
      1, -1, 0, //br

      0, 0, 0, //m
      0, 1, 0, //tm
      -1, 1, 0, //bl
  ]);

  return vert_arr;
};
Renderer.prototype.setup_buffers = function () {
  this.vert_buffer = this.gl.createBuffer();
};
Renderer.prototype.setup_attribs = function () {
  this.vert_attrib = this.gl.getAttribLocation(this.shader_program, 'aVert');
};

Renderer.prototype.buffer_data = function () {
  this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vert_buffer);
  this.gl.bufferData(this.gl.ARRAY_BUFFER, this.vert_arr, this.gl.STATIC_DRAW);
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
  gl.drawArrays(gl.TRIANGLES, 0, this.vert_arr.length / 3);

  this.disable_attribs();
};

module.exports = Renderer;

