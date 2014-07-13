'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var docco = require('gulp-docco');
var subtree = require('gulp-subtree');
var rimraf = require('gulp-rimraf');

var exec = require('child_process').exec;

var opts = {
  mocha: {
    reporter: 'spec',
    globals: [
      'setImmediate',
      'clearImmediate'
    ]
  }
};

gulp.task('test', ['test-nonet']);

gulp.task('test-all', ['test-nonet', 'test-net']);

gulp.task('default', ['test', 'watch']);

gulp.task('test-nonet', function () {
  return gulp
    .src(['test/test-*.js'])
    .pipe(mocha(opts.mocha));
});

gulp.task('test-net', function () {
  return gulp
    .src(['test/net-test-*.js'])
    .pipe(mocha(opts.mocha));
});

gulp.task('watch', function () {
  var watcher = gulp.watch(['index.js', 'lib/**', 'test/**'], ['test']);
  watcher.on('change', function(event) {
      console.log('File '+event.path+' was '+event.type+', running tasks...');
  });
});

gulp.task('clean-docs', function () {
  return gulp
    .src('docs/', {read: false})
    .pipe(rimraf());
});

gulp.task('make-docs', function () {
  return gulp
    .src(['index.js', 'lib/*.js'])
    .pipe(docco({
      layout: 'linear'
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('publish-docs', function () {
  return gulp
    .src('docs')
    .pipe(subtree({
      remote: 'github',
      message: 'Updating docs'
    }))
    .pipe(rimraf());
});

gulp.task('docs', ['clean-docs', 'make-docs', 'publish-docs']);

gulp.task('push', function (cb) {
  exec('git push github --all; git push github --tags; git push bitbucket --all; git push bitbucket --tags', function (err) {
    cb(err);
  });
});

gulp.task('npm-publish', function (cb) {
  exec('npm publish', function (err) {
    cb(err);
  });
});

gulp.task('publish', ['docs', 'push', 'npm-publish']);
