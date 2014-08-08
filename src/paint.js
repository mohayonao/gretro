"use strict";

var line = require("./line");

function process(self, x, y, color, isEdge, scanLine) {
  function scanRight(x, y) {
    while (x <= self.maxX && !isEdge(x + 1, y)) {
      x++;
    }
    return x;
  }
  function scanLeft(x, y) {
    while (x > 0 && !isEdge(x - 1, y)) {
      x--;
    }
    return x;
  }

  var q = [ x, y ];

  do {
    x = q.shift();
    y = q.shift();

    if (isEdge(x, y)) {
      continue;
    }

    var rx = scanRight(x, y);
    var lx = scanLeft(x, y);

    line(self, lx, y, rx, y, color);

    if (y - 1 >= 0) {
      scanLine(lx, rx, y - 1, q);
    }

    if (y + 1 < self.height) {
      scanLine(lx, rx, y + 1, q);
    }

  } while (q.length);
}

module.exports = function(self, x, y, color) {
  var targetColor = self.getPixel(x, y);

  function isEdge(x, y) {
    return self.getPixel(x, y) !== targetColor;
  }
  function scanLine(lx, rx, y, queue) {
    while (lx <= rx) {
      while (lx <= rx && isEdge(lx, y)) {
        lx++;
      }
      if (isEdge(lx, y)) {
        break;
      }
      while (lx <= rx && !isEdge(lx, y)) {
        lx++;
      }
      queue.push(lx - 1, y);
    }
  }

  process(self, x, y, color, isEdge, scanLine);
};
