"use strict";

module.exports = function(gr, _) {
  /**
   *  line
   *
   *  @param {int}
   *  @param {int}
   *  @param {int}
   *  @param {int}
   */
  gr.Canvas.addMethod("line", function(x1, y1, x2, y2) {
    _.stroke(this, function(color) {
      if (y1 === y2) {
        lineH(this.$, Math.min(x1, x2), Math.max(x1, x2), y1, color);
      } else if (x1 === x2) {
        lineV(this.$, Math.min(y1, y2), Math.max(y1, y2), x1, color);
      } else {
        var pt1 = [ x1, y1 ];
        var pt2 = [ x2, y2 ];

        if (clip(this.$, pt1, pt2)) {
          lineD(this.$, pt1[X], pt1[Y], pt2[X], pt2[Y], color);
        }
      }
    });
  });

  var X = 0;
  var Y = 1;
  var LEFT   = 1;
  var RIGHT  = 2;
  var TOP    = 4;
  var BOTTOM = 8;

  function lineH($, x1, x2, y, color) {
    if (_.inRange(y, $.minY, $.maxY)) {
      x1 = Math.max(x1, $.minX);
      x2 = Math.min(x2, $.maxX);

      while (x1 <= x2) {
        $.putPixel(x1++, y, color);
      }
    }
  }

  function lineV($, y1, y2, x, color) {
    if (_.inRange(x, $.minX, $.maxX)) {
      y1 = Math.max(y1, $.minY);
      y2 = Math.min(y2, $.maxY);

      while (y1 <= y2) {
        $.putPixel(x, y1++, color);
      }
    }
  }

  function lineX($, x, y, dx, dy, sx, sy, color) {
    var e = -dx;

    for (var i = 0; i <= dx; x += sx, i++) {
      $.putPixel(x, y, color);

      e += 2 * dy;
      if (e >= 0)  {
        y += sy;
        e -= 2 * dx;
      }
    }
  }

  function lineY($, x, y, dx, dy, sx, sy, color) {
    var e = -dy;

    for (var i = 0; i <= dy; y += sy, i++) {
      $.putPixel(x, y, color);

      e += 2 * dx;
      if (e >= 0) {
        x += sx;
        e -= 2 * dy;
      }
    }
  }

  function lineD($, x1, y1, x2, y2, color) {
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    var sx = x1 < x2 ? +1 : -1;
    var sy = y1 < y2 ? +1 : -1;

    if (dx >= dy) {
      lineX($, x1, y1, dx, dy, sx, sy, color);
    } else {
      lineY($, x1, y1, dx, dy, sx, sy, color);
    }
  }

  function calcSeqCode($, pt) {
    var code = 0;

    if (pt[X] < $.minX) {
      code += LEFT;
    }
    if ($.maxX < pt[X]) {
      code += RIGHT;
    }
    if (pt[Y] < $.minY) {
      code += TOP;
    }
    if ($.maxY < pt[Y]) {
      code += BOTTOM;
    }

    return code;
  }

  function calcIntersectX($, pt1, pt2, clipX, dest) {
    var cy = ((pt2[Y] - pt1[Y]) * (clipX - pt1[X]) / (pt2[X] - pt1[X]) + pt1[Y])|0;

    if (cy < $.minY || $.maxY < cy) {
      return false;
    }

    dest[X] = clipX;
    dest[Y] = cy;

    return true;
  }

  function calcIntersectY($, pt1, pt2, clipY, dest) {
    var cx = ((pt2[X] - pt1[X]) * (clipY - pt1[Y]) / (pt2[Y] - pt1[Y]) + pt1[X])|0;

    if (cx < $.minX || $.maxX < cx) {
      return false;
    }

    dest[X] = cx;
    dest[Y] = clipY;

    return true;
  }

  function calcClippedPoint($, code, pt1, pt2, dest) {
    if ((code & LEFT) !== 0) {
      // in outside the left end
      if (calcIntersectX($, pt1, pt2, $.minX, dest)) {
        return true;
      }
    }

    if ((code & RIGHT) !== 0) {
      // in outside the right end
      if (calcIntersectX($, pt1, pt2, $.maxX, dest)) {
        return true;
      }
    }

    if ((code & TOP) !== 0) {
      // in outside the top end
      if (calcIntersectY($, pt1, pt2, $.minY, dest)) {
        return true;
      }
    }

    if ((code & BOTTOM) !== 0) {
      // in outside the top bottom
      if (calcIntersectY($, pt1, pt2, $.maxY, dest)) {
        return true;
      }
    }

    // in the case of invisible

    return false;
  }

  function clip($, pt1, pt2) {
    var code1 = calcSeqCode($, pt1);
    var code2 = calcSeqCode($, pt2);

    if (code1 === 0 && code2 === 0) {
      return true;
    }

    if ((code1 & code2) !== 0) {
      return false;
    }

    if (code1 !== 0) {
      if (!calcClippedPoint($, code1, pt1, pt2, pt1)) {
        return false;
      }
    }

    if (code2 !== 0) {
      calcClippedPoint($, code2, pt1, pt2, pt2);
    }

    return true;
  }
};
