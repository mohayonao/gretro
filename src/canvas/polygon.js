"use strict";

module.exports = function(gr, _) {
  /**
   * polygon
   *
   * @param {array} vtx
   */
  gr.Canvas.addMethod("polygon", function(vtx) {
    vtx = Array.isArray(vtx) ? vtx.map(function(edge) {
      return [ edge[0]|0, edge[1]|0 ];
    }) : [];

    _.fill(this, function(color) {
      fill(this, toEdge(clipVtx(vtx, this.$.minY, this.$.maxY)), color);
    });
    _.stroke(this, function(color) {
      stroke(this, vtx, color);
    });
  });

  var X  = 0;
  var Y  = 1;
  var Y0 = 1;
  var Y1 = 2;
  var A  = 3;
  var V  = 4;

  function eq(pt1, pt2) {
    return pt1[X] === pt2[X] && pt1[Y] === pt2[Y];
  }

  function angle(pt1, pt2) {
    return (pt2[X] - pt1[X]) / (pt2[Y] - pt1[Y]);
  }

  function clipPoint(pt1, pt2, minY, maxY) {
    var dy = pt2[Y] < minY ? minY - pt1[Y] : maxY - pt1[Y];
    var x  = ((pt2[X] - pt1[X]) * dy / (pt2[Y] - pt1[Y]) + pt1[X])|0;
    var y  = pt2[Y] < minY ? minY : maxY;

    return [ x, y ];
  }

  function clipVtx(vtx, minY, maxY) {
    var result = [];
    var vtxLength = vtx.length;

    for (var i = 1; i <= vtxLength; i++) {
      var pt1 = vtx[i - 1];
      var pt2 = vtx[i % vtxLength];

      if (eq(pt1, pt2)) {
        continue;
      }

      if (_.inRange(pt1[Y], minY, maxY)) {
        if (_.inRange(pt2[Y], minY, maxY)) {
          // case _.inRange(pt1) and _.inRange(pt2)
          result.push(pt1);
        } else {
          // case _.inRange(pt1) and not _.inRange(pt2)
          result.push(pt1, clipPoint(pt1, pt2, minY, maxY));
        }
      } else {
        if (_.inRange(pt2[Y], minY, maxY)) {
          // case not _.inRange(pt1) and _.inRange(pt2)
          result.push(clipPoint(pt2, pt1, minY, maxY));
        } else {
          // case not _.inRange(pt1) and not _.inRange(pt2)
          result.push(clipPoint(pt2, pt1, minY, maxY), clipPoint(pt1, pt2, minY, maxY));
        }
      }
    }

    return result;
  }

  function toEdge(vtx) {
    var result = [];

    if (vtx.length === 0) {
      return result;
    }

    var vtxLength = vtx.length;

    for (var i = 0; i < vtxLength; i++) {
      var pt1 = vtx[i].slice();
      var pt2 = vtx[(i + 1) % vtxLength].slice();

      if (pt1[Y] === pt2[Y]) {
        continue;
      }

      var edge = [
        pt1[Y] < pt2[Y] ? pt1[X] : pt2[X],
        0,
        0,
        angle(pt1, pt2),
        pt1[Y] < pt2[Y] ? +1 : -1
      ];

      edge[Y0] = Math.min(pt1[Y], pt2[Y]);
      edge[Y1] = Math.max(pt1[Y], pt2[Y]);

      result.push(edge);
    }

    return result;
  }

  function inScanLine(y) {
    return function(edge) {
      return _.inRange(y, edge[Y0], edge[Y1]);
    };
  }

  function sortByX(a, b) {
    return a[X] - b[X];
  }

  function removeIfSameVectorContinue(_, i, list) {
    return i === 0 || list[i][V] !== list[i - 1][V];
  }

  function fetchX(edge) {
    return edge[X];
  }

  function updateX(edge) {
    edge[X] += edge[A];
  }

  function fill(that, edgeList, color) {
    var minY = that.$.maxY;
    var maxY = that.$.minY;

    edgeList.forEach(function(edge) {
      minY = Math.min(minY, edge[Y0]);
      maxY = Math.max(maxY, edge[Y1]);
    });

    for (var y = minY; y <= maxY; y++) {
      var scanned = edgeList.filter(inScanLine(y));
      var sortedX = scanned.sort(sortByX)
        .filter(removeIfSameVectorContinue)
        .map(fetchX);

      for (var i = 1, imax = sortedX.length; i < imax; i += 2) {
        var x1 = sortedX[i - 1];
        var x2 = sortedX[i];
        _.putLine(that, Math.round(x1), Math.round(x2), y, color);
      }

      scanned.forEach(updateX);
    }
  }

  function stroke(that, vtx) {
    var vtxLength = vtx.length;

    for (var i = 0, imax = vtxLength; i < imax; i++) {
      var pt1 = vtx[i];
      var pt2 = vtx[(i + 1) % vtxLength];

      that.line(pt1[X], pt1[Y], pt2[X], pt2[Y]);
    }
  }
};
