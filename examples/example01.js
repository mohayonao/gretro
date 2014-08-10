var Png = require("png").Png;
var fs  = require("fs");

var gretro = require("../");

var canvas = new gretro.Canvas(320, 50);

for (var i = 0; i < 16; ++i) {
  var index = (" " + i).substr(-2);
  canvas
    .noStroke()
    .fill(i)
    .rect(i * 20, 0, 20, 40)
    .stroke(15)
    .text(index, (i * 20) + 4, 42, 15);
}

var png = new Png(new Buffer(canvas.toRGB()), 320, 50, "rgb");
var png_image = png.encodeSync();

fs.writeFileSync("./example01.png", png_image.toString("binary"), "binary");
