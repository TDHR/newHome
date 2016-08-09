var path = require('path');
var gulp = require('gulp');
var wrench = require('wrench');
var conf = require('./gulp/conf');
var merge = require('merge-stream');
var mergeJson = require('gulp-merge-json');
var plumber = require('gulp-plumber');

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

// locales 
gulp.task('locales', function() {
  var lang = ['zh', 'en'];
  for (var i = 0; i < lang.length; i++) {
    lang[i] = lang[i] = gulp.src(path.join(conf.paths.locales, '/' + lang[i] + '/*.js'))
      .pipe(plumber())
      .pipe(mergeJson(lang[i] + '.js'))
      .pipe(plumber.stop())
      .pipe(gulp.dest(path.join(conf.paths.locales)));
  }
  return merge(lang[0], lang[1]);
});

gulp.task('dev', ['cleanDev', 'locales'], function() {
  gulp.start('development');
});

gulp.task('prod', ['cleanDist', 'locales'], function() {
  gulp.start('production');
});
