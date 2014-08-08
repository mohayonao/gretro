"use strict";

function process(self, scanY, scanX, width, height) {
  var dstData = new Uint8Array(width * height);

  for (var i = 0; i < height; i++) {
    dstData.set(scanX(scanY(i)), i * width);
  }

  return [ width, height, dstData ];
}

function scanFromTop(x, y, width) {
  return function(i) {
    return (y + i) * width + x;
  };
}

function scanFromBottom(x, y, width) {
  return function(i) {
    return (y - i) * width + x;
  };
}

function scanToRight(data, width) {
  return function(index) {
    return data.subarray(index, index + width);
  };
}

function scanToLeft(data, width) {
  return function(index) {
    var result = new Uint8Array(width);

    for (var i = 0; i < width; i++) {
      result[i] = data[index - i];
    }

    return result;
  };
}

module.exports = function(self, x1, y1, x2, y2) {
  x1 = Math.max(0, Math.min(x1, self.width - 1));
  x2 = Math.max(0, Math.min(x2, self.width - 1));
  y1 = Math.max(0, Math.min(y1, self.height - 1));
  y2 = Math.max(0, Math.min(y2, self.height - 1));

  var width  = Math.abs(x2 - x1) + 1;
  var height = Math.abs(y2 - y1) + 1;
  var scanY  = (y1 <= y2) ?
    scanFromTop(x1, y1, self.width) : scanFromBottom(x1, y1, self.width);
  var scanX  = (x1 <= x2) ?
    scanToRight(self.data, width) : scanToLeft(self.data, width);

  return process(self, scanY, scanX, width, height);
};
