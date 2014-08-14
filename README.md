# gretro
[![NPM Version](http://img.shields.io/npm/v/gretro.svg?style=flat)](https://www.npmjs.org/package/gretro)
[![Build Status](http://img.shields.io/travis/mohayonao/gretro.svg?style=flat)](https://travis-ci.org/mohayonao/gretro)
[![Coverage Status](http://img.shields.io/coveralls/mohayonao/gretro.svg?style=flat)](https://coveralls.io/r/mohayonao/gretro?branch=master)
[![Dependency Status](http://img.shields.io/david/mohayonao/gretro.svg?style=flat)](https://david-dm.org/mohayonao/gretro)
[![devDependency Status](http://img.shields.io/david/dev/mohayonao/gretro.svg?style=flat)](https://david-dm.org/mohayonao/gretro)

> **Gretro** (grétrou, グレトロ) is a JavaScript graphic library for retro CG.

![](https://github.com/mohayonao/gretro/wiki/img/splash.png)

## Features

  - 16 colors chosen from available 4096 colors
  - 16 default tile patterns and 16 custom tile patterns
  - drawing in pixels, no anti aliasing
  - plugin architecture for extending gretro.Canvas

## Online Playground

  - http://mohayonao.github.io/gretro/

## Install

##### browser

  - [gretro.js](http://mohayonao.github.io/gretro/build/gretro.js)
  - [gretro.min.js](http://mohayonao.github.io/gretro/build/gretro.min.js)

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

![](https://github.com/mohayonao/gretro/wiki/img/readme-usage.png)

### Rendering

##### browser

```javascript
var gretroCanvas = new gretro.Canvas(640, 400).draw(fn);

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
var imageData = context.getImageData(0, 0, 640, 400);

new gretro.Canvas(640, 400, imageData.data).draw(fn);

context.putImageData(imageData, 0, 0);
```

##### node.js

use [node-png](https://github.com/pkrumins/node-png) `npm install png`

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
  - `new Canvas(width:int=640, height:int=400, buffer:Uint8Array=null) : Canvas`

#### Instance methods

###### Environment
  - [`getWidth() : int`](https://github.com/mohayonao/gretro/wiki/Canvas-getWidth)
  - [`getHeight() : int`](https://github.com/mohayonao/gretro/wiki/Canvas-getHeight)
  - [`getRawData() : Uint8Array`](https://github.com/mohayonao/gretro/wiki/Canvas-getRawData)

###### Setting
  - [`getColor(index:int) : int`](https://github.com/mohayonao/gretro/wiki/Canvas-getColor)
  - [`setColor(index:int, rgb:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-setColor)
  - [`getTile(index:int) : int`](https://github.com/mohayonao/gretro/wiki/Canvas-getTile)
  - [`setTile(index:int, pattern:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-setTile)

###### Color
  - [`fill(color:[int|array|function]) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-fill)
  - [`noFill() : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-noFill)
  - [`stroke(color:[int|array|function]) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-stroke)
  - [`noStroke() : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-noStroke)

###### Region
  - [`clear() : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-clear)
  - [`clip(x1:int, y1:int, x2:int, y2:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-clip)
  - [`noClip() : Canvas`](https://github.ccom/mohayonao/gretro/wiki/Canvas-noClip)
  - [`mask(mask:[Uint8Array|Canvas]) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-mask)
  - [`noMask() : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-noMask)

###### Shape
  - `arc()` _(NOT IMPLEMENTED YET)_
  - [`circle(cx:int, cy:int, r:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-circle)
  - [`ellipse(cx:int, cy:int, rx:int, ry:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-ellipse)
  - [`line(x1:int, y1:int, x2:int, y2:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-line)
  - [`point(x:int, y:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-point)
  - [`polygon(vtx:array) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-polygon)
  - [`quad(x1:int, y1:int, x2:int, y2:int, x3:int, y3:int, x4:int, y4:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-quad)
  - [`rect(x:int, y:int, width:int, height:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-rect)
  - [`triangle(x1:int, y1:int, x2:int, y2:int, x3:int, y3:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-triangle)

###### Image
  - [`clone() : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-clone)
  - [`copy(x1:int, y1:int, x2:int, y2:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-copy)
  - [`paste(cnv:Canvas, x:int, y:int) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-paste)

###### Output
  - [`toMask() : Uint8Array`](https://github.com/mohayonao/gretro/wiki/Canvas-toMask)
  - [`toRGB() : Uint8Array`](https://github.com/mohayonao/gretro/wiki/Canvas-toRGB)
  - [`toRGBA(alpha:int=255) : Uint8Array`](https://github.com/mohayonao/gretro/wiki/Canvas-toRGBA)
  - [`toIndexedColor() : Uint8Array`](https://github.com/mohayonao/gretro/wiki/Canvas-toIndexedColor)

###### Utility
  - [`draw(fn:function) : Canvas`](https://github.com/mohayonao/gretro/wiki/Canvas-draw)


## Color

You can use 16 colors on a canvas. It is possible to select from 4096 colors.

#### default color palette

![](https://github.com/mohayonao/gretro/wiki/img/defaultColorPalette.png)

#### customize color

```javascript
canvas
  .setColor(0, 0x44dd77).setColor(1, 0x22aa88)
  .fill(1).rect(20, 20, 60, 60);
```

![](https://github.com/mohayonao/gretro/wiki/img/readme-customColor.png)

#### color generator

set a function that returns a calculated color number instead of a color number.

```javascript
canvas
  .fill(function(x, y) {
    return 16 * Math.random();
  }).rect(20, 20, 60, 60);
```

![](https://github.com/mohayonao/gretro/wiki/img/readme-colorGenerator.png)

## Tile

A tile is a 4 x 4 dot pattern with 2 colors that is used to express gradation in generally.

#### usage

Set array that contains color1, color2 and tile-index instead of a color number.

```javascript
canvas.fill([ color1, color2, tileIndex ]);
```

#### default tile palette

![](https://github.com/mohayonao/gretro/wiki/img/defaultTilePalette.png)

#### custom tile

TileIndex 16-31 are customizable.

```javascript
canvas
  .setTile(16, 0x4a12)
  .stroke(13).fill([ 0, 13, 16 ])
  .circle(50, 50, 40, 40);
/* 1 2 4 8
   □ ■ □ □ = 2
   ■ □ □ □ = 1
   □ ■ □ ■ = a
   □ □ ■ □ = 4
            0x */
```

![](https://github.com/mohayonao/gretro/wiki/img/readme-customTile.png)

## Plugins

#### [gretro-text](https://github.com/mohayonao/gretro-text)

plugin to draw a text

![](https://raw.githubusercontent.com/mohayonao/gretro-text/master/examples/ascii-table.png)

#### [gretro-paint](https://github.com/mohayonao/gretro-paint)

plugin to paint a region

![](https://raw.githubusercontent.com/mohayonao/gretro-paint/master/examples/example.png)

## Contribution

  1. Fork ([https://github.com/mohayonao/gretro/fork](https://github.com/mohayonao/gretro/fork))
  1. Create a feature branch (`git checkout -b my-new-feature`)
  1. Commit your changes (`git commit -am 'add some feature'`)
  1. Run test suite with the `gulp travis` command and confirm that it passes
  1. Push to the branch (`git push origin my-new-feature`)
  1. Create new Pull Request

## License

Gretro is available under the The MIT License.
