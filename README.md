# gretro
[![NPM Version](http://img.shields.io/npm/v/gretro.svg?style=flat)](https://www.npmjs.org/package/gretro)
[![Build Status](http://img.shields.io/travis/mohayonao/gretro.svg?style=flat)](https://travis-ci.org/mohayonao/gretro)
[![Coverage Status](http://img.shields.io/coveralls/mohayonao/gretro.svg?style=flat)](https://coveralls.io/r/mohayonao/gretro?branch=master)
[![Dependency Status](http://img.shields.io/david/mohayonao/gretro.svg?style=flat)](https://david-dm.org/mohayonao/gretro)
[![devDependency Status](http://img.shields.io/david/dev/mohayonao/gretro.svg?style=flat)](https://david-dm.org/mohayonao/gretro)

> **Gretro** is a library for vintage computer graphics.

## Install

browser

```html
<script src="gretro.js"></script>
```

node.js

```sh
% npm install gretro
```

## Usage

```javascript
var canvas = new gretro.Canvas(640, 400);

for (var i = 0; i < 10000; i++) {
  var x = Math.random() * 640;
  var y = Math.random() * 400;
  var color = Math.random() * 16;
  canvas.dot(x, y, color);
}

```

### Rendering

browser

```javascript
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var imageData = context.createImageData(640, 400);

imageData.data.set(gretroCanvas.toRGBA());

context.putImageData(imageData, 0, 0);
```

node.js

```javascript
var Png = require("png").Png;
var fs  = require("fs");

var png = new Png(new Buffer(gretroCanvas.toRGB()), 640, 400, "rgb");
var png_image = png.encodeSync();

fs.writeFileSync("./image.png", png_image.toString("binary"), "binary");
```

## API

### Canvas

  - new Canvas(width:int = 640, height:int = 400) : Canvas
  - getWidth() : int
  - getHeight() : int
  - getColor(index:int) : int
  - setColor(index:int, rgb:int) : Canvas
  - getTile(index:int) : int
  - setTile(index:int, pattern:int) : Canvas
  - clear(color:[int|Color]) : Canvas
  - dot(x:int, y:int, color:[int|Color])
  - line(x1:int, y1:int, x2:int, y2:int, color:[int|Color]) : Canvas
  - rect(x:int, y:int, width:int, height:int, color:[int|Color], filled:boolean = false) : Canvas
  - circle(cx:int, cy:int, r:int, color:[int|Color], filled:boolean = false) : Canvas
  - ellipse(cx:int, cy:int, rx:int, ry:int, color:[int|Color], filled:boolean = false) : Canvas
  - paint(x:int, y:int, color:[int|Color], filled:boolean = false) : Canvas
  - text(text:string, x:int, y:int, color:[int|Color]) : Canvas
  - plotter(x:int, y:int, color:[int|Color]) : Plotter
  - toRGB() : Uint8Array
  - toRGBA(alpha:int = 255) : Uint8Array

### Color

  - new Color(color1:int, color2:int, tileIndex:int) : Color

### Plotter

  - getX() : int
  - getY() : int
  - moveTo(x:int, y:int) : Plotter
  - lineTo(x:int, y:int) : Plotter
  - moveToRel(x:int, y:int) : Plotter
  - lineToRel(x:int, y:int) : Plotter

## License

The MIT License
