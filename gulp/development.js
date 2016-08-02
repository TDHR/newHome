'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var webpack = require('webpack-stream');
var merge = require('merge-stream');
var named = require('vinyl-named');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});

// 压缩图片
gulp.task('devImg', function() {
  var min = gulp.src(path.join(conf.paths.app, '/images/*'))
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest(path.join(conf.paths.dev, '/images')));
  return merge(min);
});

// server
gulp.task('devServer', function() { 
  $.nodemon({
    script: 'app.js',
    watch: [
      'app.js',
      'views/',
      'controllers/',
      'routes/'
    ],
    env: {
      'NODE_ENV': 'development'
    }
  }).on('restart', function() {
    console.log('restarted!')
  });
});

// clean public/dev
gulp.task('cleanDev', function() {
  $.del([path.join(conf.paths.dev, '/*')]);
});

gulp.task('development', ['devImg'], function() {
  gulp.start('devServer');
});
