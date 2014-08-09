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

function process(self, cx, cy, r, delegate) {
  var x  = r;
  var y  = 0;
  var f  = -3 * r + 3;

  while (x >= y) {
    delegate(x, y);

    if (f >= 0) {
      f -= 4 * (--x);
    }
    f += 4 * (++y) + 2;
  }
}

function fill(self, cx, cy, r) {
  var color = self.fillColor;
  process(self, cx, cy, r, function(x, y) {
    line(self, cx - x, cx + x, cy - y, color);
    line(self, cx - x, cx + x, cy + y, color);
    line(self, cx - y, cx + y, cy - x, color);
    line(self, cx - y, cx + y, cy + x, color);
  });
}

function stroke(self, cx, cy, r) {
  var color = self.strokeColor;
  process(self, cx, cy, r, function(x, y) {
    dot(self, cx + x, cy + y, color);
    dot(self, cx - x, cy + y, color);
    dot(self, cx + x, cy - y, color);
    dot(self, cx - x, cy - y, color);
    dot(self, cx + y, cy + x, color);
    dot(self, cx - y, cy + x, color);
    dot(self, cx + y, cy - x, color);
    dot(self, cx - y, cy - x, color);
  });
}

module.exports = function(self, cx, cy, r) {
  if (self.fillColor !== -1) {
    fill(self, cx, cy, r);
  }
  if (self.strokeColor !== -1) {
    stroke(self, cx, cy, r);
  }
};
