"use strict";

var Png = require("png").Png;
var fs  = require("fs");

var gretro = require("../");
var gretroText = require("gretro-text");

gretro.use(gretroText);

var WIDTH  = 640;
var HEIGHT = 400;

var linexp = function(num, inMin, inMax, outMin, outMax) {
  return Math.pow(outMax / outMin, (num - inMin) / (inMax - inMin)) * outMin;
};

var logo = function(y, size) {

  function char(outline, hole) {
    return function(x, y, size, fillColor, holeColor, strokeColor) {
      this.fill(fillColor).stroke(strokeColor).polygon(outline.map(function(vtx) {
        return [ x + vtx[0] * size, y + vtx[1] * size ];
      }));
      if (hole) {
        this.fill(holeColor).rect(
          hole[0] * size + x,
          hole[1] * size + y,
          hole[2] * size,
          hole[3] * size
        );
      }
    };
  }

  var g = char([
    [ 1, 0 ], [ 0, 1 ], [ 0, 4 ], [ 1, 5 ], [ 3, 5 ], [ 4, 4 ], [ 4, 2 ], [ 2, 2 ],
    [ 3, 3 ], [ 3, 4 ], [ 1, 4 ], [ 1, 1 ], [ 4, 1 ], [ 3, 0 ]
  ]);
  var r = char([
    [ 0, 0 ], [ 0, 5 ], [ 1, 5 ], [ 1, 3 ], [ 3, 5 ], [ 4, 5 ], [ 2, 3 ], [ 3, 3 ],
    [ 4, 2 ], [ 4, 1 ], [ 3, 0 ]
  ], [ 1, 1, 2, 1 ]);
  var e = char([
    [ 0, 0 ], [ 0, 5 ], [ 4, 5 ], [ 3, 4 ], [ 1, 4 ], [ 1, 3 ], [ 3, 3 ], [ 2, 2 ],
    [ 1, 2 ], [ 1, 1 ], [ 3, 1 ], [ 2, 0 ]
  ]);
  var t = char([
    [ 0, 0 ], [ 0, 1 ], [ 2, 1 ], [ 2, 5 ], [ 3, 5 ], [ 3, 1 ], [ 5, 1 ], [ 5, 0 ]
  ]);
  var o = char([
    [ 1, 0 ], [ 0, 1 ], [ 0, 4 ], [ 1, 5 ], [ 3, 5 ], [ 4, 4 ], [ 4, 1 ], [ 3, 0 ]
  ], [ 1, 1, 2, 3 ]);

  function drawGRETRO(logo, fillColor, holeColor, strokeColor) {
    logo
      .draw(g,  0 * size, 0, size, fillColor, holeColor, strokeColor)
      .draw(r,  5 * size, 0, size, fillColor, holeColor, strokeColor)
      .draw(e, 10 * size, 0, size, fillColor, holeColor, strokeColor)
      .draw(t, 14 * size, 0, size, fillColor, holeColor, strokeColor)
      .draw(r, 20 * size, 0, size, fillColor, holeColor, strokeColor)
      .draw(o, 25 * size, 0, size, fillColor, holeColor, strokeColor);
  }

  var logo = new gretro.Canvas(29 * size + 1, 5 * size + 1);
  var x    = (WIDTH - logo.getWidth()) >> 1;

  logo.draw(function() {
    drawGRETRO(logo, 15, 0, -1);

    logo.draw(function() {
      logo.mask(logo).noStroke();
      var h = (size >> 2) * 1.5;
      for (var i = 0; i <= 15; i++) {
        logo.fill([ 14, 10, i ]).rect(0, i * h, logo.getWidth(), h);
      }
    });

    drawGRETRO(logo, -1, -1, 15);
  });

  this.mask(
    new gretro.Canvas(WIDTH, HEIGHT).paste(logo, x, y)
  ).paste(logo, x, y);
};

var sky = function(h) {
  this.noStroke();
  for (var i = 0, imax = h / 20; i < imax; i++) {
    this.fill([ 1, 9, i + 1]).rect(0, i * 20, WIDTH, 20);
  }
};

var star = function(n) {
  for (var i = 0; i < n; i++) {
    var x = Math.random() * WIDTH;
    var y = Math.random() * HEIGHT;
    var c = Math.random() * 14;
    this.stroke(c).point(x, y);
  }
};

var moon = function(x, y, r) {
  this
    .noStroke()
    .fill(function(x, y) {
      return y % 2 ? 2 : Math.random() < 0.25 ? 2 : 3;
    })
    .circle(x, y, r);
};

var ground = function(h) {
  var cx = this.getWidth() / 2;

  this
    .noStroke()
    .fill(4)
    .rect(0, h, WIDTH, HEIGHT - h)
    .stroke(12)
    .noFill()
    .line(0, h, WIDTH, h);

  [ 1, 2, 3, 4, 5 ].map(function(i) {
    return Math.round(linexp(i, 1, 5, 4, HEIGHT - h - 20));
  }).forEach(function(y) {
    this.line(0, y + h, WIDTH, y + h);
  }, this);

  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(i) {
    return [ i * 30, i * 100 ];
  }).forEach(function(pt) {
    this
      .line(cx - pt[0], h, cx - pt[1], HEIGHT)
      .line(cx + pt[0], h, cx + pt[1], HEIGHT);
  }, this);
};

var mountain = function(x, y, xsize, ysize) {
  this
    .noStroke()
    .fill(15)
    .polygon([
      [ x, y ], [ x + 5 * xsize, y ], [ x + 4 * xsize, y - 3 * ysize ]
    ])
    .fill(7)
    .polygon([
      [ x + 5 * xsize, y ], [ x + 4 * xsize, y - 3 * ysize ], [ x + 8 * xsize, y ]
    ]);
};

var credit = function() {
  this
    .noFill()
    .stroke(15)
    .text("JAVASCRIPT GRAPHIC LIBRARY for VINTAGE CG / 2014 (C) MOHAYONAO", 10, 386);
};

var canvas = new gretro.Canvas(WIDTH, HEIGHT);

canvas
  .setColor(2, 0xec6800)
  .setColor(3, 0xb7282e)
  .setColor(4, 0x006e54)
  .setColor(12, 0x1f3134)
  .draw(sky, 280)
  .draw(star, 1024)
  .draw(moon, 520, 460, 280)
  .draw(ground, 280)
  .draw(mountain, 100, 279, 25, 12)
  .draw(mountain,  25, 279, 15,  5)
  .draw(mountain, 480, 279,  5,  3)
  .draw(mountain, 540, 279,  5,  3)
  .draw(logo, 60, 18)
  .draw(credit);

var png = new Png(new Buffer(canvas.toRGB()), WIDTH, HEIGHT, "rgb");
var png_image = png.encodeSync();

fs.writeFileSync(__dirname + "/splash.png", png_image.toString("binary"), "binary");
