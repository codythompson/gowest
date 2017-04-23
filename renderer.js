var constructor = require('./constructor');

var Renderer = constructor({
  required: ['gl'],
  arg_fields: ['scale'],
  defualts: {
    scale: new Float32Array([1,1,1]),
  },
  init: function (args) {
  }
});

module.exports = Renderer;

