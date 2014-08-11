# gretro
[![NPM Version](http://img.shields.io/npm/v/gretro.svg?style=flat)](https://www.npmjs.org/package/gretro)
[![Build Status](http://img.shields.io/travis/mohayonao/gretro.svg?style=flat)](https://travis-ci.org/mohayonao/gretro)
[![Coverage Status](http://img.shields.io/coveralls/mohayonao/gretro.svg?style=flat)](https://coveralls.io/r/mohayonao/gretro?branch=master)
[![Dependency Status](http://img.shields.io/david/mohayonao/gretro.svg?style=flat)](https://david-dm.org/mohayonao/gretro)
[![devDependency Status](http://img.shields.io/david/dev/mohayonao/gretro.svg?style=flat)](https://david-dm.org/mohayonao/gretro)

> **Gretro** (grétrou, グレトロ) is a JavaScript Graphic library for vintage CG.

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
  canvas.stroke(color).point(x, y);
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
  - new Canvas(width:int = 640, height:int = 400, buffer=Uint8Array) : Canvas

#### Instance methods

  - [`getWidth() : int`](https://github.com/mohayonao/gretro/wiki/Canvas-getWidth)
  - [`getHeight() : int`](https://github.com/mohayonao/gretro/wiki/Canvas-getHeight)
  - [`getRawData() : Uint8Array`](https://github.com/mohayonao/gretro/wiki/Canvas-getRawData)
  - [`getColor(index:int) : int`](https://github.com/mohayonao/gretro/wiki/Canvas-getColor)
  - [`setColor(index:int, rgb:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-setColor)
  - [`getTile(index:int) : int`](https://github.com/mohayonao/gretro/wiki/Canvas-getTile)
  - [`setTile(index:int, pattern:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-setTile)
  - [`stroke(color:color) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-stroke)
  - [`noStroke() : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-noStroke)
  - [`fill(color:color) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-fill)
  - [`noFill(color:color) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-noFill)
  - [`clip(x1:int, y1:int, x2:int, y2:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-clip)
  - [`noClip() : Canvas`](https://github.ccom/mohayonao/gretro/wiki/Canvas-noClip)
  - [`mask(mask:[Uint8Array|Canvas]) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-mask)
  - [`noMask() : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-noMask)
  - [`clear() : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-clear)
  - [`point(x:int, y:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-point)
  - [`line(x1:int, y1:int, x2:int, y2:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-line)
  - [`rect(x:int, y:int, width:int, height:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-rect)
  - [`arc(cx:int, cy:int, rx:int, ry:int, start:int, stop:int, mode:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-arc)
  - [`circle(cx:int, cy:int, r:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-circle)
  - [`ellipse(cx:int, cy:int, rx:int, ry:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-ellipse)
  - [`triangle(x1:int, y1:int, x2:int, y2:int, x3:int, y3:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-triangle)
  - [`quad(x1:int, y1:int, x2:int, y2:int, x3:int, y3:int, x4:int, y4:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-quad)
  - [`polygon(vtx:array) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-polygon)
  - [`copy(x1:int, y1:int, x2:int, y2:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-copy)
  - [`paste(cnv:Canvas, x:int, y:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-paste)
  - [`clone() : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-clone)
  - [`toMask() : Uint8Array`](https://github.com/mohayonao/gretro/wiki/Canvas-toMask)
  - [`toRGB() : Uint8Array`](https://github.com/mohayonao/gretro/wiki/Canvas-toRGB)
  - [`toRGBA(alpha:int = 255) : Uint8Array`](https://github.com/mohayonao/gretro/wiki/Canvas-toRGBA)
  - [`toIndexedColor() : Uint8Array`](https://github.com/mohayonao/gretro/wiki/Canvas-toIndexedColor)
  - [`draw(fn:function) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-draw)

## Color

You can use 16 colors on a canvas. It is possible to select from 4096 colors.

### default color palette

![](http://the.mohayonao.com/gretro/github-contents/example01.png)

### customize color

```javascript
canvas.setColor(1, 0x006655);
```

### color generator

```javascript
canvas.fill(function(x, y) {
  return 16 * Math.random();
}).circle(100, 100, 50);
```

## Tile

A tile is a 4 x 4 dot pattern with 2 colors that is used to express gradation in generally.

### usage

Set array that contains color1, color2 and tile-index instead of a color number.

```javascript
canvas.fill([ color1, color2, tileIndex ]).circle(100, 100, 50);
```

### default tile palette

![](http://the.mohayonao.com/gretro/github-contents/example02.png)

### custom tile

Index 16-31 are able to use for custom tile.

```javascript
canvas.setTile(16, 0x22f2);
/* 1 2 4 8
   □ ■ □ □ = 2
   ■ ■ ■ ■ = f
   □ ■ □ □ = 2
   □ ■ □ □ = 2
            0x */
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
