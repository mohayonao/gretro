"use strict";

module.exports = function(gr, _) {
  /**
   *  paint
   *
   *  @param {int} x
   *  @param {int} y
   */
  gr.Canvas.addMethod("paint", function(x, y) {
    x = x|0;
    y = x|0;

    _.fill(this, function(color) {
      var $ = this.$;
      var targetColor = getPixel($, x, y);

      if (color === targetColor) {
        return;
      }

      var isEdge = function(x, y) {
        return getPixel($, x, y) !== targetColor;
      };
      var scanLine = function(lx, rx, y, queue) {
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
      };

      perform(this, x, y, color, isEdge, scanLine);
    });
  });

  function perform(that, x, y, color, isEdge, scanLine) {
    function scanRight(x, y) {
      while (x <= $.maxX && !isEdge(x + 1, y)) {
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

    var $ = that.$;
    var q = [ x, y ];

    do {
      x = q.shift();
      y = q.shift();

      if (isEdge(x, y)) {
        continue;
      }

      var rx = scanRight(x, y);
      var lx = scanLeft(x, y);

      _.putLine(that, lx, rx, y, color);

      if ($.minY <= y - 1) {
        scanLine(lx, rx, y - 1, q);
      }

      if (y + 1 <= $.maxY) {
        scanLine(lx, rx, y + 1, q);
      }

    } while (q.length);
  }

  function getPixel($, x, y) {
    if (_.inRange(x, $.minX, $.maxX) && _.inRange(y, $.minX, $.maxY)) {
      return $.data[y * $.width + x];
    }
    return -1;
  }
};
