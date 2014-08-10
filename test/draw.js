var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var ll = 11;
var __ =  0;

describe("Canvas#draw", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should be able to draw in the sandbox", function() {
    canvas.stroke($$).noFill();

    var result = canvas.draw(function() {
      canvas.stroke(ll).dot(2, 2);
    });

    canvas.dot(5, 5);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,ll,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,$$,__,__,
      __,__,__,__,__,__,__,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  describe("arguments", function() {

    it("rest arguments are applied to the function", function() {
      canvas.draw(function(a, b, c) {
        expect(this).to.equal(canvas);
        expect(a).to.equal(1);
        expect(b).to.equal(2);
        expect(c).to.equal(3);
      }, 1, 2, 3);
    });

  });

  describe("return value", function() {

    it("return value", function() {
      var result = canvas.draw(function() {
        return 100;
      });
      expect(result).to.equal(100);
    });

    it("non return", function() {
      var result = canvas.draw(function() {
      });
      expect(result).to.equal(canvas);
    });

  });

  describe("error case", function() {

    it("should do nothing when given a non function", function() {
        canvas.stroke($$).noFill().draw(null);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
          __,__,__,__,__,__,__,__,
        ]));
    });

  });

});
