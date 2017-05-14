var l = -0.5; // left
var r = 0.5; // right
var t = 0.5; // top
var b = -0.5; // bottom
var s = 0.5; // shallow
var d = -0.5; // deep

var stl = [l, t, s]; // shallow top left
var sbl = [l, b, s]; // shallow bottom left
var sbr = [r, b, s]; // shallow bottom right
var str = [r, t, s]; // shallow top right

var dtl = [l, t, d]; // deep top left
var dbl = [l, b, d]; // deep bottom left
var dbr = [r, b, d]; // deep bottom right
var dtr = [r, t, d]; // deep top right

/*
 * west - facing west
 * stl - sbl
 * dtl - dbl
 *
 * north - facing north
 * str - stl
 * dtr - dtl
 *
 * shallow (top) - facing up
 * stl - str
 * sbl - sbr
 *
 * east - facing east
 * sbr - str
 * dbr - dtr
 *
 * south - facing south
 * sbl - sbr
 * dbl - dbr
 *
 * deep (bottom) - facing down
 * dtr - dtl
 * dbr - dbl
 */

var west = [
  new Float32Array(stl),
  new Float32Array(dtl),
  new Float32Array(dbl),

  new Float32Array(dbl),
  new Float32Array(sbl),
  new Float32Array(stl)
];

var north = [
  new Float32Array(str),
  new Float32Array(dtr),
  new Float32Array(dtl),

  new Float32Array(dtl),
  new Float32Array(stl),
  new Float32Array(str)
];

var shallow = [
  new Float32Array(stl),
  new Float32Array(sbl),
  new Float32Array(sbr),

  new Float32Array(sbr),
  new Float32Array(str),
  new Float32Array(stl)
];

var east = [
  new Float32Array(sbr),
  new Float32Array(dbr),
  new Float32Array(dtr),

  new Float32Array(dtr),
  new Float32Array(str),
  new Float32Array(sbr)
];

var south = [
  new Float32Array(sbl),
  new Float32Array(dbl),
  new Float32Array(dbr),

  new Float32Array(dbr),
  new Float32Array(sbr),
  new Float32Array(sbl)
];

var deep = [
  new Float32Array(dtr),
  new Float32Array(dbr),
  new Float32Array(dbl),

  new Float32Array(dbl),
  new Float32Array(dtl),
  new Float32Array(dtr)
];

exports.cube = [
  west,
  north,
  shallow,
  east,
  south,
  deep
];

