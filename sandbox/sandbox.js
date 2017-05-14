require('babel-polyfill')
var shaders = require('../src/shaders');
var Renderer = require('../src/renderer')

window.canvas = null;
window.gwgl = null;
window.renderer = null;

function sbload () {
  document.body.style.margin = '0';
  document.body.style.padding = '0';

  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.left = '0';
  canvas.style.top = '0';
  gwgl = canvas.getContext('webgl');
  shaders.init(gwgl);
  renderer = new Renderer({
    gl: gwgl,
    shader_program: shaders.basic_prog
  });
  document.body.appendChild(canvas);
  gwgl.clearColor(0, 0, 0, 1);
  gwgl.clear(gwgl.COLOR_BUFFER_BIT);
  renderer.draw();
};
window.addEventListener('load', sbload);
