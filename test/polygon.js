var chai   = require("chai");
var expect = chai.expect;
var gretro = require("../");

var $$ = 15;
var __ =  0;

describe("#line", function() {
  var canvas = null;

  beforeEach(function() {
    canvas = new gretro.Canvas(8, 8);
  });

  it("should draw a polygon", function() {
    var result = canvas.polygon([
      [ 4, 1 ], [ 1, 4 ], [ 6, 6 ]
    ], $$);

    expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
      __,__,__,__,__,__,__,__,
      __,__,__,__,$$,__,__,__,
      __,__,__,$$,$$,__,__,__,
      __,__,$$,__,__,$$,__,__,
      __,$$,$$,__,__,$$,__,__,
      __,__,__,$$,$$,__,$$,__,
      __,__,__,__,__,$$,$$,__,
      __,__,__,__,__,__,__,__,
    ]));

    expect(result, "should return self").to.equal(canvas);
  });

  describe("should be able to fill a polygon", function() {
    describe("no clipping", function() {
      afterEach(function() {
        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,__,__,__,__,__,__,
          __,__,__,__,$$,__,__,__,
          __,__,__,$$,$$,__,__,__,
          __,__,$$,$$,$$,$$,__,__,
          __,$$,$$,$$,$$,$$,__,__,
          __,__,__,__,$$,$$,$$,__,
          __,__,__,__,__,__,$$,__,
          __,__,__,__,__,__,__,__,
        ]));
      });
      it("a -> b -> c", function() {
        canvas.polygon([
          [ 4, 1 ], [ 1, 4 ], [ 6, 6 ]
        ], $$, true);
      });
      it("c -> b -> a", function() {
        canvas.polygon([
          [ 6, 6 ], [ 1, 4 ], [ 4, 1 ]
        ], $$, true);
      });
    });

    describe("clipping", function() {
      it("A -> B -> C", function() {
        canvas.polygon([
          [ 4, -2 ], [ -2, 4 ], [ 9, 9 ]
        ], $$, true);

        expect(canvas.toIndexedColor()).to.eql(new Uint8Array([
          __,__,$$,$$,$$,__,__,__,
          __,$$,$$,$$,$$,$$,__,__,
          $$,$$,$$,$$,$$,$$,__,__,
          $$,$$,$$,$$,$$,$$,$$,__,
          $$,$$,$$,$$,$$,$$,$$,__,
          $$,$$,$$,$$,$$,$$,$$,$$,
          __,__,$$,$$,$$,$$,$$,$$,
          __,__,__,__,$$,$$,$$,$$,
        ]));
      });
    });

    describe("other case", function() {
      afterEach(function() {
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

      it("not array", function() {
        canvas.polygon(100, $$, true);
      });

      it("empty", function() {
        canvas.polygon([
          /* empty */
        ], $$, true);
      });

      it("same points", function() {
        canvas.polygon([
          [ 2, 2 ], [ 2, 2 ], [ 2, 2 ]
        ], $$, true);
      });
    });
  });

});
