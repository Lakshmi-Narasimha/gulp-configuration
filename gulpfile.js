/* globals require, exports */

'use strict';

// gulp plugins
var gulp     = require('gulp'),
gutil        = require('gulp-util'),
jshint       = require('gulp-jshint'),
clean        = require('gulp-clean'),
connect      = require('gulp-connect'),
imagemin     = require('gulp-imagemin'),
uglify       = require('gulp-uglify'),
rename       = require('gulp-rename'),
del          = require('del');

// Connect Task
gulp.task('connect', connect.server({
  root: ['./app'],
  port: 1337,
  livereload: true
}));

// Minify images
gulp.task('imagemin', function () {
  return es.concat(
    gulp.src('./app/images/**/*.png')
      .pipe(imagemin())
      .pipe(gulp.dest('/dest/img')),
    gulp.src('./app/images/**/*.jpg')
      .pipe(imagemin())
      .pipe(gulp.dest('/dest/img')),
    gulp.src('./app/images/**/*.gif')
      .pipe(imagemin())
      .pipe(gulp.dest('/dest/img'))
  );
});

// Script task
gulp.task('jsmin', function() {
    gulp.src(['app/scripts/**/*.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/dist/'))
});

//Clean build task
gulp.task('clean', function () {
  del(['app/dist/**/*.js'])
});

gulp.task('clean-build', function () {
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

//build
gulp.task('build', ['clean-build', 'jsmin'], function () {
});

gulp.task('watch', function () {
  gulp.watch([ 'app/scripts' + '/**/*.js'], ['jsmin']);
});