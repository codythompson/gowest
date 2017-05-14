var concat_f32 = function () {
  var sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i].length;
  }

  var new_arr = new Float32Array(sum);

  var ix = 0;
  for (let i = 0; i < arguments.length; i++) {
    for (let j = 0; j < arguments[i].length; j++) {
      new_arr[ix++] = arguments[i][j];
    }
  }

  return new_arr;
};

exports.concat_f32 = concat_f32;
