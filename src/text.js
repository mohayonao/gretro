"use strict";

var char = require("./char");

function text(self, str, x, y, color) {
  str.split("").forEach(function(ch, i) {
    char(self, ch.charCodeAt(0), x + i * 6, y, color);
  });
}
module.exports = text;
