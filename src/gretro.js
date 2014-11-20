"use strict";

var util = require("./utils");
var used = [];

var gretro = {};

gretro.version = "0.2.4";

gretro.use = function(fn) {
  /* istanbul ignore else */
  if (used.indexOf(fn) === -1) {
    fn(gretro, util);
    used.push(fn);
  }
  return gretro;
};

gretro.use(require("./canvas"));

/* istanbul ignore next */
if (typeof global.window !== "undefined") {
  global.window.gretro = gretro;
}

module.exports = gretro;
