var basic_vert = `

attribute vec3 vertPos;
attribute vec4 vertColor;
attribute vec4 vertIx;

uniform mat4 projMat;
uniform mat4 mvMat;

varying lowp vec4 fragVertIx;
varying lowp vec4 fragVertColor;

void main() {
  vec4 mvPos = mvMat * vec4(vertPos, 1.0);
  gl_Position = projMat * mvPos;
  fragVertColor = vertColor;
  fragVertIx = vertIx;
}

`;

var basic_frag = `

varying lowp vec4 fragVertColor;
varying lowp vec4 fragVertIx;

void main() {
  // adapted from http://codeflow.org/entries/2012/aug/02/easy-wireframe-display-with-barycentric-coordinates/
  if (any(lessThan(fragVertIx, vec4(0.02)))) {
    gl_FragColor = vec4(0, 0, 1, 1);
  } else {
    gl_FragColor = fragVertColor;
  }
}

`;
