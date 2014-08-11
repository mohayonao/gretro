"use strict";

var Png = require("png").Png;
var fs  = require("fs");

var gretro = require("../");

var offsetX = function(x) {
  return function(pt) {
    return [ pt[0] + x, pt[1] ];
  };
};

var star = function(x) {
  this.stroke(13).fill(5)
    .polygon([
      [ 50, 20 ], [ 30, 80 ], [ 80, 40 ], [ 20, 40 ], [ 70, 80 ]
    ].map(offsetX(x)));
};

var cross = function(x) {
  this.stroke(12).fill(4)
    .polygon([
      [ 20, 40 ], [ 20, 60 ], [ 40, 60 ], [ 40, 80 ], [ 60, 80 ],
      [ 60, 60 ], [ 80, 60 ], [ 80, 40 ], [ 60, 40 ], [ 60, 20 ],
      [ 40, 20 ], [ 40, 40 ]
    ].map(offsetX(x)));
};

var comb = function(x) {
  this.stroke(11).fill(3)
    .polygon([
      [ 20, 20 ], [ 20, 50 ], [ 80, 50 ], [ 80, 80 ], [ 70, 80 ],
      [ 70, 20 ], [ 60, 20 ], [ 60, 80 ], [ 50, 80 ], [ 50, 20 ],
      [ 40, 20 ], [ 40, 80 ], [ 30, 80 ], [ 30, 20 ]
    ].map(offsetX(x)));
};

var canvas = new gretro.Canvas(300, 100);

canvas.draw(star ,   0);
canvas.draw(cross, 100);
canvas.draw(comb , 200);

var png = new Png(new Buffer(canvas.toRGB()), canvas.getWidth(), canvas.getHeight(), "rgb");
var png_image = png.encodeSync();

fs.writeFileSync(__dirname + "/polygon.png", png_image.toString("binary"), "binary");
