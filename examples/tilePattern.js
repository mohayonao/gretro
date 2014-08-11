"use strict";

var Png = require("png").Png;
var fs  = require("fs");

var gretro = require("../");
var gretroText = require("gretro-text");

gretro.use(gretroText);

var tilePattern = function() {
  for (var i = 0; i < 16; ++i) {
    var index = (" " + i).substr(-2);
    this
      .noStroke()
      .fill([ 8, 15, i ])
      .rect(i * 20, 0, 20, 40)
      .stroke(15)
      .text(index, (i * 20) + 4, 42);
  }
};

var canvas = new gretro.Canvas(320, 50);

canvas.draw(tilePattern);

var png = new Png(new Buffer(canvas.toRGB()), 320, 50, "rgb");
var png_image = png.encodeSync();

fs.writeFileSync(__dirname + "/tilePattern.png", png_image.toString("binary"), "binary");
