"use strict";

function Plotter(_canvas, _x, _y , _color) {
  this.getX = function() {
    return _x;
  };
  this.getY = function() {
    return _y;
  };
  this.moveTo = function(x, y) {
    _x = x|0;
    _y = y|0;

    return this;
  };
  this.lineTo = function(x, y) {
    var x1 = _x;
    var x2 = x|0;
    var y1 = _y;
    var y2 = y|0;

    _canvas.line(x1, y1, x2, y2, _color);
    _x = x2;
    _y = y2;

    return this;
  };
  this.moveToRel = function(x, y) {
    return this.moveTo(_x + (x|0), _y + (y|0));
  };
  this.lineToRel = function(x, y) {
    return this.lineTo(_x + (x|0), _y + (y|0));
  };
}

module.exports = function(canvas, x, y, color) {
  return new Plotter(canvas, x, y, color);
};
