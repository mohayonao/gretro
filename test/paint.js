var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var ll = 11;
var oo = 12;
var __ =  0;

describe("Canvas#paint", function() {
  var canvas = null;

  beforeEach(function() {
    /*
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,$$,$$,$$,$$,
      __,__,__,__,oo,__,__,__,
      __,__,__,__,oo,__,__,__,
      $$,$$,$$,$$,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
    */
    canvas = new gretro.Canvas(8, 8);

    canvas.stroke($$);
    canvas.line(3, 0, 3, 2);
    canvas.line(3, 2, 8, 2);
    canvas.line(0, 5, 4, 5);
    canvas.line(4, 5, 4, 8);

    canvas.stroke(oo);
    canvas.line(4, 3, 4, 4);
  });

  it("should be able to fill", function() {
    var result = canvas.fill(ll).paint(3, 3);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      ll,ll,ll,$$,__,__,__,__,
      ll,ll,ll,$$,__,__,__,__,
      ll,ll,ll,$$,$$,$$,$$,$$,
      ll,ll,ll,ll,oo,__,__,__,
      ll,ll,ll,ll,oo,__,__,__,
      $$,$$,$$,$$,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should be able to fill in an empty canvas", function() {
    var canvas = new gretro.Canvas(8, 8);

    canvas.fill(0).clear().fill([ __, $$, 8 ]).paint();

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      $$,__,$$,__,$$,__,$$,__,
      __,$$,__,$$,__,$$,__,$$,
      $$,__,$$,__,$$,__,$$,__,
      __,$$,__,$$,__,$$,__,$$,
      $$,__,$$,__,$$,__,$$,__,
      __,$$,__,$$,__,$$,__,$$,
      $$,__,$$,__,$$,__,$$,__,
      __,$$,__,$$,__,$$,__,$$,
    ]));
  });

  it("when background color and fill color are same", function() {
    var result = canvas.fill(__).paint(3, 3);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,$$,$$,$$,$$,
      __,__,__,__,oo,__,__,__,
      __,__,__,__,oo,__,__,__,
      $$,$$,$$,$$,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should NOT be able to fill when noFill", function() {
    var result = canvas.noFill().paint(3, 3);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,__,__,__,__,
      __,__,__,$$,$$,$$,$$,$$,
      __,__,__,__,oo,__,__,__,
      __,__,__,__,oo,__,__,__,
      $$,$$,$$,$$,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
      __,__,__,__,$$,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});

describe("CanvasRGB#paint", function() {

  it("should throw error", function() {
    var canvas = new gretro.CanvasRGB(1, 4);

    expect(function() {
      canvas.paint(3, 3);
    }).throw(Error)
  });

});

describe("CanvasRGBA#paint", function() {

  it("should throw error", function() {
    var canvas = new gretro.CanvasRGBA(1, 4);

    expect(function() {
      canvas.paint(3, 3);
    }).throw(Error)
  });

});
