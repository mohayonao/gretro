"use strict";

var X = 0;
var Y = 1;
var LEFT   = 1;
var RIGHT  = 2;
var TOP    = 4;
var BOTTOM = 8;

function lineH(self, x1, x2, y, color) {
  x1 = Math.max(x1, self.minX);
  x2 = Math.min(x2, self.maxX);

  while (x1 <= x2) {
    self.putPixel(x1++, y, color);
  }
}

function lineV(self, y1, y2, x, color) {
  y1 = Math.max(y1, self.minY);
  y2 = Math.min(y2, self.maxY);

  while (y1 <= y2) {
    self.putPixel(x, y1++, color);
  }
}

function lineX(self, x, y, dx, dy, sx, sy, color) {
  var e = -dx;

  for (var i = 0; i <= dx; x += sx, i++) {
    self.putPixel(x, y, color);

    e += 2 * dy;
    if (e >= 0)  {
      y += sy;
      e -= 2 * dx;
    }
  }
}

function lineY(self, x, y, dx, dy, sx, sy, color) {
  var e = -dy;

  for (var i = 0; i <= dy; y += sy, i++) {
    self.putPixel(x, y, color);

    e += 2 * dx;
    if (e >= 0) {
      x += sx;
      e -= 2 * dy;
    }
  }
}

function lineD(self, x1, y1, x2, y2, color) {
  var dx = Math.abs(x1 - x2);
  var dy = Math.abs(y1 - y2);
  var sx = x1 < x2 ? +1 : -1;
  var sy = y1 < y2 ? +1 : -1;

  if (dx >= dy) {
    lineX(self, x1, y1, dx, dy, sx, sy, color);
  } else {
    lineY(self, x1, y1, dx, dy, sx, sy, color);
  }
}

function calcSeqCode(self, pt) {
  var code = 0;

  if (pt[X] < self.minX) {
    code += LEFT;
  }
  if (self.maxX < pt[X]) {
    code += RIGHT;
  }
  if (pt[Y] < self.minY) {
    code += TOP;
  }
  if (self.maxY < pt[Y]) {
    code += BOTTOM;
  }

  return code;
}

function calcIntersectX(self, pt1, pt2, clipX, dest) {
  var cy = ((pt2[Y] - pt1[Y]) * (clipX - pt1[X]) / (pt2[X] - pt1[X]) + pt1[Y])|0;

  if (cy < self.minY || self.maxY < cy) {
    return false;
  }

  dest[X] = clipX;
  dest[Y] = cy;

  return true;
}

function calcIntersectY(self, pt1, pt2, clipY, dest) {
  var cx = ((pt2[X] - pt1[X]) * (clipY - pt1[Y]) / (pt2[Y] - pt1[Y]) + pt1[X])|0;

  if (cx < self.minX || self.maxX < cx) {
    return false;
  }

  dest[X] = cx;
  dest[Y] = clipY;

  return true;
}

function calcClippedPoint(self, code, pt1, pt2, dest) {
  if ((code & LEFT) !== 0) {
    // in outside the left end
    if (calcIntersectX(self, pt1, pt2, self.minX, dest)) {
      return true;
    }
  }

  if ((code & RIGHT) !== 0) {
    // in outside the right end
    if (calcIntersectX(self, pt1, pt2, self.maxX, dest)) {
      return true;
    }
  }

  if ((code & TOP) !== 0) {
    // in outside the top end
    if (calcIntersectY(self, pt1, pt2, self.minY, dest)) {
      return true;
    }
  }

  if ((code & BOTTOM) !== 0) {
    // in outside the top bottom
    if (calcIntersectY(self, pt1, pt2, self.maxY, dest)) {
      return true;
    }
  }

  // in the case of invisible

  return false;
}

function clip(self, pt1, pt2) {
  var code1 = calcSeqCode(self, pt1);
  var code2 = calcSeqCode(self, pt2);

  if (code1 === 0 && code2 === 0) {
    return true;
  }

  if ((code1 & code2) !== 0) {
    return false;
  }

  if (code1 !== 0) {
    if (!calcClippedPoint(self, code1, pt1, pt2, pt1)) {
      return false;
    }
  }

  if (code2 !== 0) {
    calcClippedPoint(self, code2, pt1, pt2, pt2);
  }

  return true;
}

module.exports = function(self, x1, y1, x2, y2) {
  var color = self.strokeColor;

  if (color !== -1) {
    if (y1 === y2) {
      if (self.minY <= y1 && y1 <= self.maxY) {
        lineH(self, Math.min(x1, x2), Math.max(x1, x2), y1, color);
      }
    } else if (x1 === x2) {
      if (self.minX <= x1 && x1 <= self.maxX) {
        lineV(self, Math.min(y1, y2), Math.max(y1, y2), x1, color);
      }
    } else {
      var pt1 = [ x1, y1 ];
      var pt2 = [ x2, y2 ];

      if (clip(self, pt1, pt2)) {
        lineD(self, pt1[X], pt1[Y], pt2[X], pt2[Y], color);
      }
    }
  }
};
