"use strict";

var line = require("./line");

var X  = 0;
var Y  = 1;
var Y0 = 1;
var Y1 = 2;
var A  = 3;

function eq(pt1, pt2) {
  return pt1[X] === pt2[X] && pt1[Y] === pt2[Y];
}

function inRange(num, min, max) {
  return min <= num && num <= max;
}

function rangeFn(n, m, fn) {
  while (n <= m) {
    fn(n++);
  }
}

function pairsEach(list, fn) {
  for (var i = 1, imax = list.length; i < imax; i += 2) {
    fn(list[i - 1], list[i]);
  }
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

    if (inRange(pt1[Y], minY, maxY)) {
      if (inRange(pt2[Y], minY, maxY)) {
        // case inRange(pt1) and inRange(pt2)
        result.push(pt1);
      } else {
        // case inRange(pt1) and not inRange(pt2)
        result.push(pt1, clipPoint(pt1, pt2, minY, maxY));
      }
    } else {
      if (inRange(pt2[Y], minY, maxY)) {
        // case not inRange(pt1) and inRange(pt2)
        result.push(clipPoint(pt2, pt1, minY, maxY));
      } else {
        // case not inRange(pt1) and not inRange(pt2)
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

    var c2 = vtx[(i + 2) % vtxLength];
    var edge = [
      pt1[Y] < pt2[Y] ? pt1[X] : pt2[X],
      0,
      0,
      (pt2[X] - pt1[X]) / (pt2[Y] - pt1[Y])
    ];

    if ((pt2[Y] - pt1[Y]) * (pt2[Y] - c2[Y]) < 0) {
      if (pt1[Y] < pt2[Y]) {
        pt2[Y] -= 1;
      } else {
        pt2[Y] += 1;
        edge[X] += edge[A];
      }
    }

    edge[Y0] = Math.min(pt1[Y], pt2[Y]);
    edge[Y1] = Math.max(pt1[Y], pt2[Y]);

    result.push(edge);
  }

  return result;
}

function inScanLine(edgeList, y) {
  return edgeList.filter(function(edge) {
    return inRange(y, edge[Y0], edge[Y1]);
  });
}

function updateX(edge) {
  var x = edge[X];

  edge[X] += edge[A];

  return x;
}

function fill(self, edgeList, color) {
  rangeFn(self.minY, self.maxX, function(y) {
    pairsEach(inScanLine(edgeList, y).map(updateX).sort(), function(x1, x2) {
      line(self, Math.round(x1), y, Math.round(x2), y, color);
    });
  });
}

function stroke(self, vtx, color) {
  var vtxLength = vtx.length;

  for (var i = 0, imax = vtxLength; i < imax; i++) {
    var pt1 = vtx[i];
    var pt2 = vtx[(i + 1) % vtxLength];

    line(self, pt1[X], pt1[Y], pt2[X], pt2[Y], color);
  }
}

module.exports = function(self, vtx, color, filled) {
  if (filled) {
    fill(self, toEdge(clipVtx(vtx, self.minY, self.maxY)), color);
  } else {
    stroke(self, vtx, color);
  }
};
