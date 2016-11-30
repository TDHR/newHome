var path = require('path');
var gulp = require('gulp');
var wrench = require('wrench');
var conf = require('./gulp/conf');
var merge = require('merge-stream');
var mergeJson = require('gulp-merge-json');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

// locales 
gulp.task('locales', function() {
  var lang = ['zh', 'en'];
  for (var i = 0; i < lang.length; i++) {
    lang[i] = gulp.src(path.join(conf.paths.locales, '/' + lang[i] + '/**/*.js'))
      .pipe(mergeJson(lang[i] + '.js'))
      .pipe(gulp.dest(path.join(conf.paths.locales)));
  }
  return merge(lang[0], lang[1]);
});

// 生成 config 文件
gulp.task('prodCfg', function() {
  return gulp.src(path.join(conf.paths.src, '/scripts/config/config-prod.js'))
    .pipe(concat('config-now.js'))
    .pipe(gulp.dest(path.join(conf.paths.src, '/scripts/config')));
});

gulp.task('devCfg', function() {
  return gulp.src(path.join(conf.paths.src, '/scripts/config/config-dev.js'))
    .pipe(concat('config-now.js'))
    .pipe(gulp.dest(path.join(conf.paths.src, '/scripts/config')));
});

gulp.task('dev', ['cleanDev', 'tpl', 'locales', 'devCfg'], function() {
  gulp.start('development');
});

gulp.task('prod', ['cleanTmp', 'tpl', 'locales', 'prodCfg'], function() {
  gulp.start('production');
});
