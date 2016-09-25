var path = require('path');
var gulp = require('gulp');
var tmodjs = require('gulp-tmod');
var conf = require('./conf');
var merge = require('merge-stream');
var rename = require('gulp-rename');

gulp.task('tpl', function() {
  var fn = ['site'];
  for (var i = 0; i < fn.length; i++) {
    fn[i] = gulp.src(path.join(conf.paths.src, '/tpl/' + fn[i] + '/*.html'))
      .pipe(tmodjs({
        templateBase: path.join(conf.paths.src, '/tpl/' + fn[i])
      }))
      .pipe(rename({
        basename: fn[i],
        prefix: 'tpl-'
      }))
      .pipe(gulp.dest(path.join(conf.paths.src, '/tpl')));
  }
  return merge(fn[0]);
});