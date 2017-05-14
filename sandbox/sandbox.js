require('babel-polyfill')
var shaders = require('../src/shaders');
var Renderer = require('../src/renderer');

window.canvas = null;
window.gwgl = null;
window.renderer = null;

window.mat4 = require('gl-matrix').mat4;

window.ddd = null;
function sbdraw () {
  gwgl.clearColor(0, 0, 0, 1);
  gwgl.clear(gwgl.COLOR_BUFFER_BIT);
  renderer.draw();

  if (!ddd) {
    requestAnimationFrame(sbdraw);
  }
};

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

  mat4.translate(renderer.mv_mat, renderer.mv_mat, [0, 0, -0.11]);

  sbdraw();
};
window.addEventListener('load', sbload);
