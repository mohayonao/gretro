"use strict";

var lineH = require("./lineH");

function process(self, x, y, color, isEdge, scanLine) {
  function scanRight(x, y) {
    while (x < self.width && !isEdge(x + 1, y)) {
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

    lineH(self, lx, y, rx - rx, 0, 1, 0, color);

    if (y - 1 >= 0) {
      scanLine(lx, rx, y - 1, q);
    }

    if (y + 1 < self.height) {
      scanLine(lx, rx, y + 1, q);
    }

  } while (q.length);
}

function fill(self, x, y, color) {
  var isEdge = function(x, y) {
    return self.getPixel(x, y) === color;
  };
  var scanLine = function(lx, rx, y, q) {
    while (lx <= rx && lx < self.width) {
      if (!isEdge(lx, y)) {
        q.push(lx, y);
      }
      lx++;
    }
  };

  process(self, x, y, color, isEdge, scanLine);
}

function drop(self, x, y, color) {
  var targetColor = self.getPixel(x, y);
  var isEdge = function(x, y) {
    return self.getPixel(x, y) !== targetColor;
  };
  var scanLine = function(lx, rx, y, q) {
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
      q.push(lx - 1, y);
    }
  };

  process(self, x, y, color, isEdge, scanLine);
}

module.exports = function(self, x, y, color, filled) {
  if (filled) {
    fill(self, x, y, color);
  } else {
    drop(self, x, y, color);
  }
};
