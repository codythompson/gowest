var constructor = require('./constructor');

var Renderer = constructor({
  fields: [
    'gl',
    'shader_program',
    // 'scale'
  ],
  required: [
    'gl',
    'shader_program'
  ],
  defaults: {
    // scale: new Float32Array([1,1,1]),
  },
  init: function (args) {
    // this.scale[1] = 2;

    this.vert_arr = this.build_verts();
  },
});
Renderer.prototype.build_verts = function () {
  var vert_arr = new Float32Array([
      0, 0, 0, //tl
      0, 1, 0, //bl
      1, 1, 0, //br
  ]);

  return vert_arr;
};

module.exports = Renderer;

