var _ = require('lodash');

var check_required = function (required, given, name) {
  required = required || [];
  given = given || {};

  for (let req of required) {
    if (typeof req === 'string') {
      if (!(req in given)) {
        throw `[${name}] "${req}" is a required arg`;
      }
    } else if (Array.isArray(req)) {
      var found = false;
      for (var i = 0; !found && i < or_req.length; i++) {
        if (or_req in given) {
          found = true;
        }
      }
      if (!found) {
        throw `[${name}] "${req}" is a required arg`;
      }
    }
  }
};

var get_arg_fields = function (arg_fields, args) {
  arg_fields = arg_fields || [];
  args = args || {};
  var arg_field_vals = {};
  for (let arg_field of arg_fields) {
    arg_field_vals[arg_field] = args[arg_field];
  }
  return arg_field_vals;
};

var constructor = function (const_opts) {
  const_opts = const_opts || {};

  return function (args) {
    // check for required args and throw an exception if missing
    check_required(const_opts.required, args, const_opts.name);
    // add default vals to args
    args = _.defaults(args || {}, const_opts.defaults);
    // extend "this" for keys found in arg_fields and vals in args
    _.extend(this, get_arg_fields(const_opts.fields, args));
    // call init
    const_opts.init && const_opts.init.call(this, args);
  };
};

module.exports = constructor;
