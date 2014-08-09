"use strict";

var util = require("./utils");
var used = [];

exports.version = "0.1.2a";

exports.use = function(fn) {
  /* istanbul ignore else */
  if (used.indexOf(fn) === -1) {
    fn(this, util);
    used.push(fn);
  }
  return this;
};

exports.use(require("./canvas"));
