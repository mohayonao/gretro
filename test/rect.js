var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#rect", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  describe("should be abole to stroke a rectangle", function() {
    beforeEach(function() {
      canvas.stroke($$).noFill();
    });
    afterEach(function() {
      expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
        __,__,__,__,__,__,__,__,
        __,$$,$$,$$,$$,$$,$$,__,
        __,$$,__,__,__,__,$$,__,
        __,$$,__,__,__,__,$$,__,
        __,$$,__,__,__,__,$$,__,
        __,$$,__,__,__,__,$$,__,
        __,$$,$$,$$,$$,$$,$$,__,
        __,__,__,__,__,__,__,__,
      ]));
    });

    it("→↓←↑", function() {
      canvas.rect(1, 1, 6, 6);
    });
    it("←↑→↓", function() {
      canvas.rect(6, 6, -6, -6);
    });
  });

  it("should be able to fill a rectangle", function() {
    var result = canvas.noStroke().fill($$).rect(1, 1, 6, 6);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,$$,$$,$$,$$,$$,$$,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  it("should be able to clip", function() {
    var result = canvas.noStroke().fill($$).rect(-3, -3, 6, 6);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      $$,$$,$$,__,__,__,__,__,
      $$,$$,$$,__,__,__,__,__,
      $$,$$,$$,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

});
