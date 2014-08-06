"use strict";

var gulp = require("gulp");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");

gulp.task("lint", function() {
  return gulp.src([ "gretro.js", "examples/*.js" ])
    .pipe(jshint(".jshintrc"))
    .pipe(jshint.reporter(require("jshint-stylish")))
    .pipe(jshint.reporter("fail"));
});

gulp.task("test", function() {
  return gulp.src([ "test/*.js" ])
    .pipe(mocha());
});

gulp.task("coverage", function(cb) {
  gulp.src([ "gretro.js" ])
    .pipe(istanbul())
    .on("finish", function() {
      return gulp.src([ "test/*.js" ])
        .pipe(mocha())
        .pipe(istanbul.writeReports("coverage"))
        .on("end", cb);
    });
});

gulp.task("compress", function() {
  gulp.src([ "gretro.js" ])
   .pipe(uglify())
   .pipe(rename("gretro.min.js"))
   .pipe(gulp.dest("./"));
});

gulp.task("travis", [ "lint", "coverage" ]);
gulp.task("default", [ "travis" ]);
