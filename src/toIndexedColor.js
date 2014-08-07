"use strict";

var selectColorIndex = require("./selectColorIndex");

module.exports = function(self) {
  var result = new Uint8Array(self.width * self.height);
  var data   = self.data;
  var width  = self.width;
  var height = self.height;

  var i = 0;
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      result[i] = selectColorIndex(self, x, y, data[i++]);
    }
  }

  return result;
};
