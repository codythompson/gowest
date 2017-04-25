require('babel-polyfill')
var Renderer = require('../src/renderer')

window.canvas = null;
window.gwgl = null;
window.renderer = null;

function sbload () {
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gwgl = canvas.getContext('webgl');
  renderer = new Renderer({
    gl: gwgl
  });
};
window.addEventListener('load', sbload);
