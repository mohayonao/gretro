# gretro
[![NPM Version](http://img.shields.io/npm/v/gretro.svg?style=flat)](https://www.npmjs.org/package/gretro)
[![Build Status](http://img.shields.io/travis/mohayonao/gretro.svg?style=flat)](https://travis-ci.org/mohayonao/gretro)
[![Coverage Status](http://img.shields.io/coveralls/mohayonao/gretro.svg?style=flat)](https://coveralls.io/r/mohayonao/gretro?branch=master)
[![Dependency Status](http://img.shields.io/david/mohayonao/gretro.svg?style=flat)](https://david-dm.org/mohayonao/gretro)
[![devDependency Status](http://img.shields.io/david/dev/mohayonao/gretro.svg?style=flat)](https://david-dm.org/mohayonao/gretro)

> **Gretro** (grétrou, グレトロ) is a JavaScript Graphic library for vintage CG.

![](http://the.mohayonao.com/gretro/github-contents/splash.png)

## Install

##### browser

  - [gretro.js](http://the.mohayonao.com/gretro/github-contents/gretro.js)
  - [gretro.min.js](http://the.mohayonao.com/gretro/github-contents/gretro.min.js)

```html
<script src="/path/to/gretro.js"></script>
```

##### node.js

```sh
% npm install gretro
```

## Usage

```javascript
var canvas = new gretro.Canvas(220, 110);

canvas
  .stroke(13).circle( 40, 40, 30)
  .stroke( 7).circle(110, 40, 30)
  .stroke(10).circle(180, 40, 30)
  .stroke(14).circle( 75, 70, 30)
  .stroke(12).circle(145, 70, 30);
```

![](http://the.mohayonao.com/gretro/github-contents/readme-usage.png)

### Rendering

##### browser

```javascript
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var imageData = context.createImageData(640, 400);

imageData.data.set(gretroCanvas.toRGBA());

context.putImageData(imageData, 0, 0);
```

draw directly to the html-canvas

```javascript
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var imageData = htmlCanvasContext.getImageData(0, 0, 640, 400);

var gretroCanvas = new gretro.Canvas(640, 400, imageData.data);

gretroCanvas.draw(fn);

htmlCanvasContext.putImageData(imageData, 0, 0);
```

##### node.js

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
  - `new Canvas(width:int = 640, height:int = 400, buffer=Uint8Array) : Canvas`

#### Instance methods

###### Environment
  - [`getWidth()`](https://github.com/mohayonao/gretro/wiki/Canvas-getWidth)
  - [`getHeight()`](https://github.com/mohayonao/gretro/wiki/Canvas-getHeight)
  - [`getRawData()`](https://github.com/mohayonao/gretro/wiki/Canvas-getRawData)

###### Setting
  - [`getColor()`](https://github.com/mohayonao/gretro/wiki/Canvas-getColor)
  - [`setColor()`](https://github.com/mohayonao/gretro/wiki/Canvas-setColor)
  - [`getTile()`](https://github.com/mohayonao/gretro/wiki/Canvas-getTile)
  - [`setTile()`](https://github.com/mohayonao/gretro/wiki/Canvas-setTile)

###### Color
  - [`fill()`](https://github.com/mohayonao/gretro/wiki/Canvas-fill)
  - [`noFill()`](https://github.com/mohayonao/gretro/wiki/Canvas-noFill)
  - [`stroke()`](https://github.com/mohayonao/gretro/wiki/Canvas-stroke)
  - [`noStroke()`](https://github.com/mohayonao/gretro/wiki/Canvas-noStroke)

###### Region
  - [`clear()`](https://github.com/mohayonao/gretro/wiki/Canvas-clear)
  - [`clip()`](https://github.com/mohayonao/gretro/wiki/Canvas-clip)
  - [`noClip()`](https://github.ccom/mohayonao/gretro/wiki/Canvas-noClip)
  - [`mask()`](https://github.com/mohayonao/gretro/wiki/Canvas-mask)
  - [`noMask()`](https://github.com/mohayonao/gretro/wiki/Canvas-noMask)

###### Shape
  - [`arc()`](https://github.com/mohayonao/gretro/wiki/Canvas-arc)
  - [`circle()`](https://github.com/mohayonao/gretro/wiki/Canvas-circle)
  - [`ellipse()`](https://github.com/mohayonao/gretro/wiki/Canvas-ellipse)
  - [`line()`](https://github.com/mohayonao/gretro/wiki/Canvas-line)
  - [`point()`](https://github.com/mohayonao/gretro/wiki/Canvas-point)
  - [`polygon()`](https://github.com/mohayonao/gretro/wiki/Canvas-polygon)
  - [`quad()`](https://github.com/mohayonao/gretro/wiki/Canvas-quad)
  - [`rect()`](https://github.com/mohayonao/gretro/wiki/Canvas-rect)
  - [`triangle()`](https://github.com/mohayonao/gretro/wiki/Canvas-triangle)

###### Image
  - [`clone()`](https://github.com/mohayonao/gretro/wiki/Canvas-clone)
  - [`copy()`](https://github.com/mohayonao/gretro/wiki/Canvas-copy)
  - [`paste()`](https://github.com/mohayonao/gretro/wiki/Canvas-paste)

###### Output
  - [`toMask()`](https://github.com/mohayonao/gretro/wiki/Canvas-toMask)
  - [`toRGB()`](https://github.com/mohayonao/gretro/wiki/Canvas-toRGB)
  - [`toRGBA()`](https://github.com/mohayonao/gretro/wiki/Canvas-toRGBA)
  - [`toIndexedColor()`](https://github.com/mohayonao/gretro/wiki/Canvas-toIndexedColor)

###### Utility
  - [`draw()`](https://github.com/mohayonao/gretro/wiki/Canvas-draw)


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

TileIndex 16-31 are customizable.

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
