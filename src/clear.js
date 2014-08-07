"use strict";

module.exports = function(self, color) {
  var data = self.data;

  for (var i = 0, imax = data.length; i < imax; i++) {
    data[i] = color;
  }
};
