# gretro
[![NPM Version](http://img.shields.io/npm/v/gretro.svg?style=flat)](https://www.npmjs.org/package/gretro)
[![Build Status](http://img.shields.io/travis/mohayonao/gretro.svg?style=flat)](https://travis-ci.org/mohayonao/gretro)
[![Coverage Status](http://img.shields.io/coveralls/mohayonao/gretro.svg?style=flat)](https://coveralls.io/r/mohayonao/gretro?branch=master)
[![Dependency Status](http://img.shields.io/david/mohayonao/gretro.svg?style=flat)](https://david-dm.org/mohayonao/gretro)
[![devDependency Status](http://img.shields.io/david/dev/mohayonao/gretro.svg?style=flat)](https://david-dm.org/mohayonao/gretro)

> **Gretro** is a JavaScript Graphic library for vintage CG.

![splash](http://the.mohayonao.com/gretro/github-contents/splash.png)

## Install

browser

  - [gretro.js](http://the.mohayonao.com/gretro/github-contents/gretro.js)
  - [gretro.min.js](http://the.mohayonao.com/gretro/github-contents/gretro.min.js)

```html
<script src="/path/to/gretro.js"></script>
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

#### Constructor
  - new Canvas(width:int = 640, height:int = 400) : Canvas

#### Instance methods

  - getWidth() : int
  - getHeight() : int
  - getColor(index:int) : int
  - setColor(index:int, rgb:int) : Canvas
  - getTile(index:int) : int
  - setTile(index:int, pattern:int) : Canvas
  - clear(color:[int|array] = 0) : Canvas
  - dot(x:int, y:int, color:[int|array]) : Canvas
  - line(x1:int, y1:int, x2:int, y2:int, color:[int|array]) : Canvas
  - rect(x:int, y:int, width:int, height:int, color:[int|array], filled:boolean = false) : Canvas
  - circle(cx:int, cy:int, r:int, color:[int|array], filled:boolean = false) : Canvas
  - ellipse(cx:int, cy:int, rx:int, ry:int, color:[int|array], filled:boolean = false) : Canvas
  - paint(x:int, y:int, color:[int|array], filled:boolean = false) : Canvas
  - char(char:int, x:int, y:int, color:[int|array]) : Canvas
  - text(text:string, x:int, y:int, color:[int|array]) : Canvas
  - plotter(x:int, y:int, color:[int|array]) : Plotter
  - clone() : Canvas
  - toRGB() : Uint8Array
  - toRGBA(alpha:int = 255) : Uint8Array
  - toIndexedColor() : Uint8Array

### Plotter

#### Instance methods

  - getX() : int
  - getY() : int
  - moveTo(x:int, y:int) : Plotter
  - lineTo(x:int, y:int) : Plotter
  - moveToRel(x:int, y:int) : Plotter
  - lineToRel(x:int, y:int) : Plotter

## Color

You can use 16 colors on a canvas. It is possible to select from 4096 colors.

### default color palette

![example01](http://the.mohayonao.com/gretro/github-contents/example01.png)

### customize color

```javascript
canvas.setColor(1, 0x006655);
```

## Tile

A tile is a 4 x 4 dot pattern with 2 colors that is used to express gradation in generally.

### usage

Set array that contains color1, color2 and tile-index instead of a color number.

```javascript
canvas.circle(100, 100, 50, [ color1, color2, tileIndex ]);
```

### default tile palette

![example02](http://the.mohayonao.com/gretro/github-contents/example02.png)

### customize tile

```javascript
canvas.setTile(1, 0xf0f0);
```

## Contribution

  1. Fork ([https://github.com/mohayonao/gretro/fork](https://github.com/mohayonao/gretro/fork))
  1. Create a feature branch (`git checkout -b my-new-feature`)
  1. Commit your changes (`git commit -am 'add some feature'`)
  1. Run test suite with the `gulp travis` command and confirm that it passes
  1. Push to the branch (`git push origin my-new-feature`)
  1. Create new Pull Request

## License

Gretro is available under the The MIT License.
