"use strict";

function line(self, x1, x2, y, color) {
  x1 = Math.max(x1, self.minX);
  x2 = Math.min(x2, self.maxX);

  while (x1 <= x2) {
    self.putPixel(x1++, y, color);
  }
}

function getPixel(self, x, y) {
  if (self.minX <= x && x <= self.maxX && self.minX <= y && y <= self.maxY) {
    return self.data[y * self.width + x];
  }
  return -1;
}

function process(self, x, y, isEdge, scanLine) {
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

  var color = self.fillColor;
  var q = [ x, y ];

  do {
    x = q.shift();
    y = q.shift();

    if (isEdge(x, y)) {
      continue;
    }

    var rx = scanRight(x, y);
    var lx = scanLeft(x, y);

    line(self, lx, rx, y, color);

    if (y - 1 >= 0) {
      scanLine(lx, rx, y - 1, q);
    }

    if (y + 1 < self.height) {
      scanLine(lx, rx, y + 1, q);
    }

  } while (q.length);
}

module.exports = function(self, x, y) {
  if (self.fillColor === -1) {
    return;
  }

  var targetColor = getPixel(self, x, y);

  function isEdge(x, y) {
    return getPixel(self, x, y) !== targetColor;
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

  process(self, x, y, isEdge, scanLine);
};
