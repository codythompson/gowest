require('babel-polyfill')
var Renderer = require('../renderer')

window.canvas = null;
window.gwgl = null;
window.renderer = null;

function sbload () {
  canvas = document.createElement('canvas');
  gwgl = canvas.getContext('webgl');
  renderer = new Renderer();
};
window.addEventListener('load', sbload);
