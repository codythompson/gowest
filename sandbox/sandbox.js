require('babel-polyfill')
var shaders = require('../src/shaders');
var Renderer = require('../src/renderer');
var BlockBuilder = require('../src/block_builder');

window.canvas = null;
window.gwgl = null;
window.renderer = null;
window.BlockBuilder = BlockBuilder;

window.mat4 = require('gl-matrix').mat4;
window.vec4 = require('gl-matrix').vec4;

window.trans_z = -3;
window.rot_x = 0;
// window.rot_x = Math.PI / 8;
window.rot_y = 0;
// window.rot_y = Math.PI / 8;
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
  } else {
    console.log('exiting');
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
  var bb = new BlockBuilder({
    children_we: 2,
    children_ns: 2,
    children_tb: 2
  });
  var super_build_child = bb.build_child;
  bb.build_child = function (we, ns, tb) {
    var child_obj = super_build_child(we, ns, tb);
    child_obj.color = 0xff8800;
    return child_obj;
  };
  console.log(bb.build());
  console.log('TODO why the black screen');
  renderer.build_block(bb.build());
  document.body.appendChild(canvas);

  sbdraw();
};
window.addEventListener('load', sbload);

window.addEventListener('blur', function () {
  console.log('blur');
  window.ddd = true;
});
// window.addEventListener('focus', function () {
//   console.log('focus');
  // window.ddd = false;
  // sbdraw();
// });
