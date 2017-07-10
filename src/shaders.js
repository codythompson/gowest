var basic_vert = `

attribute vec3 aVert;
attribute vec4 aVertIx;
attribute vec3 aVertColor;

uniform mat4 uProjMat;
uniform mat4 uMVMat;

varying lowp vec4 vVertIx;
varying lowp vec3 vVertColor;

void main() {
  vec4 mvPos = uMVMat * vec4(aVert, 1.0);
  gl_Position = uProjMat * mvPos;
  vVertIx = aVertIx;
  vVertColor = aVertColor;
}

`;

var basic_frag = `

varying lowp vec4 vVertIx;
varying lowp vec3 vVertColor;

void main() {
  // adapted from http://codeflow.org/entries/2012/aug/02/easy-wireframe-display-with-barycentric-coordinates/
  if (any(lessThan(vVertIx, vec4(0.02)))) {
    gl_FragColor = vec4(0, 0, 1, 1);
  } else {
    gl_FragColor = vec4(vVertColor, 1);
  }
}

`;

var compile_program = function (gl, vert_src, frag_src) {
  var v_shader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(v_shader, vert_src);
  gl.compileShader(v_shader);
  if (!gl.getShaderParameter(v_shader, gl.COMPILE_STATUS)) {
    throw '[gowest][shaders][compile_program] vert shader issue:\n' + gl.getShaderInfoLog(v_shader);
  }

  var f_shader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(f_shader, frag_src);
  gl.compileShader(f_shader);
  if (!gl.getShaderParameter(f_shader, gl.COMPILE_STATUS)) {
    throw '[gowest][shaders][compile_program] frag shader issue:\n' + gl.getShaderInfoLog(f_shader);
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, v_shader);
  gl.attachShader(prog, f_shader);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw '[gowest][shaders][compile_program] Can\'t link program';
  }

  return prog;
};

var init = function (gl) {
  exports.basic_prog = compile_program(gl, basic_vert, basic_frag);
};

exports.init = init;
