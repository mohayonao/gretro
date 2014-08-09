"use strict";

function dot(self, x, y, color) {
  if (self.minX <= x && x <= self.maxX && self.minX <= y && y <= self.maxY) {
    self.putPixel(x, y, color);
  }
}

function line(self, x1, x2, y, color) {
  if (self.minY <= y && y <= self.maxY) {
    x1 = Math.max(x1, self.minX);
    x2 = Math.min(x2, self.maxX);

    while (x1 <= x2) {
      self.putPixel(x1++, y, color);
    }
  }
}

function process(self, cx, cy, rx, ry, delegate) {
  var x = rx;
  var y = 0;
  var b = Math.pow(rx / ry, 2);
  var d = rx;
  var f = -2 * d +     1 + 2 * b;
  var h = -4 * d + 2 * 1     + b;

  while (x >= 0) {
    delegate(x, y);

    if (f >= 0) {
      x--;
      f -= 4 * x;
      h -= 4 * x - 2;
    }
    if (h < 0) {
      y++;
      f += 4 * b * y + 2 * b;
      h += 4 * b * y;
    }
  }
}

function fill(self, cx, cy, rx, ry) {
  var color = self.fillColor;
  process(self, cx, cy, rx, ry, function(x, y) {
    line(self, cx - x, cx + x, cy + y, color);
    line(self, cx - x, cx + x, cy - y, color);
  });
}

function stroke(self, cx, cy, rx, ry) {
  var color = self.strokeColor;
  process(self, cx, cy, rx, ry, function(x, y) {
    dot(self, cx + x, cy + y, color);
    dot(self, cx - x, cy + y, color);
    dot(self, cx + x, cy - y, color);
    dot(self, cx - x, cy - y, color);
  });
}

module.exports = function(self, cx, cy, rx, ry) {
  if (self.fillColor !== -1) {
    fill(self, cx, cy, rx, ry);
  }
  if (self.strokeColor !== -1) {
    stroke(self, cx, cy, rx, ry);
  }
};
