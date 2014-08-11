var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("Canvas#copy", function() {
  var canvas = null;

  beforeEach(function() {
    /*
    $$,__,$$,$$,$$,__,__,__,
    __,$$,__,__,__,$$,__,__,
    $$,__,__,__,__,__,$$,__,
    $$,__,__,__,__,__,$$,__,
    $$,__,__,__,__,__,$$,__,
    __,$$,__,__,__,$$,__,__,
    __,__,$$,$$,$$,__,__,__,
    __,__,__,__,__,__,__,__,
    */
    canvas = new gretro.Canvas(8, 8);
    canvas.stroke($$);
    canvas.circle(3, 3, 3);
    canvas.point(0, 0);
  });

  it("should return new canvas", function() {
    var result = canvas.copy(0, 0, 8, 8);

    expect(result.toIndexedColor()).to.eql(new Uint8Array([
      $$,__,$$,$$,$$,__,__,__,
      __,$$,__,__,__,$$,__,__,
      $$,__,__,__,__,__,$$,__,
      $$,__,__,__,__,__,$$,__,
      $$,__,__,__,__,__,$$,__,
      __,$$,__,__,__,$$,__,__,
      __,__,$$,$$,$$,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result).to.not.equal(canvas);
  });

  describe("direction", function() {
    it("RIGHT + TOP", function() {
      var result = canvas.copy(8, 0, 0, 8);

      expect(result.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,$$,$$,$$,__,$$,
        __,__,$$,__,__,__,$$,__,
        __,$$,__,__,__,__,__,$$,
        __,$$,__,__,__,__,__,$$,
        __,$$,__,__,__,__,__,$$,
        __,__,$$,__,__,__,$$,__,
        __,__,__,$$,$$,$$,__,__,
        __,__,__,__,__,__,__,__,
      ]));
    });
    it("LEFT + TOP", function() {
      var result = canvas.copy(0, 8, 8, 0);

      expect(result.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,__,__,__,__,__,
        __,__,$$,$$,$$,__,__,__,
        __,$$,__,__,__,$$,__,__,
        $$,__,__,__,__,__,$$,__,
        $$,__,__,__,__,__,$$,__,
        $$,__,__,__,__,__,$$,__,
        __,$$,__,__,__,$$,__,__,
        $$,__,$$,$$,$$,__,__,__,
      ]));
    });
    it("RIGHT + BOTTOM", function() {
      var result = canvas.copy(8, 8, 0, 0);

      expect(result.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,__,__,__,__,__,
        __,__,__,$$,$$,$$,__,__,
        __,__,$$,__,__,__,$$,__,
        __,$$,__,__,__,__,__,$$,
        __,$$,__,__,__,__,__,$$,
        __,$$,__,__,__,__,__,$$,
        __,__,$$,__,__,__,$$,__,
        __,__,__,$$,$$,$$,__,$$,
      ]));
    });
  });

});
