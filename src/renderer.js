var constructor = require('./constructor');

var Renderer = constructor({
  fields: [
    'scale'
  ],
  required: [
    'gl'
  ],
  defaults: {
    scale: new Float32Array([1,1,1]),
  },
  init: function (args) {
    this.scale[1] = 2;
  }
});

module.exports = Renderer;

