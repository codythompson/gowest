require('babel-polyfill')
var shaders = require('../src/shaders');
var Renderer = require('../src/renderer');

window.canvas = null;
window.gwgl = null;
window.renderer = null;

window.mat4 = require('gl-matrix').mat4;

window.trans_z = -3;
window.rot_x = Math.PI / 8;
window.rot_y = Math.PI / 8;
window.rot_z = 0;

window.ddd = null;
function sbdraw () {
  renderer.mv_mat = mat4.create();
  mat4.translate(renderer.mv_mat, renderer.mv_mat, [0, 0, trans_z]);
  mat4.rotateZ(renderer.mv_mat, renderer.mv_mat, rot_z);
  mat4.rotateY(renderer.mv_mat, renderer.mv_mat, rot_y);
  mat4.rotateX(renderer.mv_mat, renderer.mv_mat, rot_x);

  gwgl.clearColor(0, 0, 0, 1);
  gwgl.clear(gwgl.COLOR_BUFFER_BIT | gwgl.DEPTH_BUFFER_BIT);
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
  gwgl.enable(gwgl.DEPTH_TEST);
  shaders.init(gwgl);
  renderer = new Renderer({
    gl: gwgl,
    shader_program: shaders.basic_prog
  });
  document.body.appendChild(canvas);

  sbdraw();
};
window.addEventListener('load', sbload);
