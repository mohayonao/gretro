"use strict";

var char = require("./char");

function text(self, str, x, y) {
  if (self.strokeColor !== -1) {
    for (var i = 0, imax = str.length; i < imax; i++) {
      char(self, str.charCodeAt(i), x + i * 6, y);
    }
  }
}
module.exports = text;
