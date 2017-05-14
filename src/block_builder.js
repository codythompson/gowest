var constructor = require('./constructor');

var BlockBuilder = constructor({
  fields: [
    'name',
    'we',
    'ns',
    'tb',
    'children_we',
    'children_ns',
    'children_tb'
  ],
  required: [],
  defaults: {
    name: null,
    we: 0,
    ns: 0,
    tb: 0,
    children_we: 0,
    children_ns: 0,
    children_tb: 0
  },
  init: function (args) {}
});

BlockBuilder.prototype.set_name = function (name) {
  this.name = name;
  return this;
};
BlockBuilder.prototype.set_children_we = function (count) {
  this.children_we = count;
  return this;
};
BlockBuilder.prototype.set_children_ns = function (count) {
  this.children_ns = count;
  return this;
};
BlockBuilder.prototype.set_children_tb = function (count) {
  this.children_tb = count;
  return this;
};

BlockBuilder.prototype.build = function () {
  var block = {
    name: this.name
  };

  var we_arr = [];
  for (let we = 0; we < this.children_we; we++) {
    var ns_arr = [];
    for (let ns = 0; ns < this.children_ns; ns++) {
      var tb_arr = [];
      for (let tb = 0; tb < this.children_tb; tb++) {
        tb_arr.push({
          we: we,
          ns: ns,
          tb: tb
        });
      }
      ns_arr.push(tb_arr);
    }
    we_arr.push(ns_arr);
  }

  block.children = we_arr;
};
