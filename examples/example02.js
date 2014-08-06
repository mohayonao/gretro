var Png = require("png").Png;
var fs  = require("fs");

var gretro = require("../");

var canvas = new gretro.Canvas(320, 50);

for (var i = 0; i < 16; ++i) {
  var index = (" " + i).substr(-2);
  var color = new gretro.Color(8, 15, i);
  canvas.rect(i * 20, 0, 20, 40, color, true);
  canvas.text(index, (i * 20) + 4, 42, 15);
}

var png = new Png(new Buffer(canvas.toRGB()), 320, 50, "rgb");
var png_image = png.encodeSync();

fs.writeFileSync("./png.png", png_image.toString("binary"), "binary");
