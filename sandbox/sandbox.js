require('babel-polyfill')
var shaders = require('../src/shaders');
var Renderer = require('../src/renderer')

window.canvas = null;
window.gwgl = null;
window.renderer = null;

function sbload () {
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gwgl = canvas.getContext('webgl');
  shaders.init(gwgl);
  renderer = new Renderer({
    gl: gwgl,
    shader_program: shaders.basic_prog
  });
};
window.addEventListener('load', sbload);
