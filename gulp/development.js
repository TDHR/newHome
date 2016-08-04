var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var webpack = require('webpack-stream');
var merge = require('merge-stream');
var named = require('vinyl-named');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cached');
var del = require('del');

// 处理图片
gulp.task('devImages', function() {
  var min = gulp.src(path.join(conf.paths.src, '/images/*'))
    .pipe(plumber())
    .pipe(cache('images'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.dev, '/images')));
  return merge(min);
});

// styles
gulp.task('devStyles', function() {
  return gulp.src(path.join(conf.paths.src, '/styles/*.scss'))
    .pipe(plumber())
    .pipe(cache('styles'))
    .pipe(sass().on('error', conf.errorHandler('Sass')))
    .pipe(autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.dev, '/styles')));
});

// scripts
gulp.task('devScripts', function() {
  return gulp.src(path.join(conf.paths.src, '/scripts/*.js'))
    .pipe(plumber())
    .pipe(cache('scripts'))
    .pipe(named())
    .pipe(webpack({
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel'
        }]
      }
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.dev, '/scripts')));
});

// server
gulp.task('devServer', function() {
  livereload.listen();
  nodemon({
    script: 'app.js',
    ext: 'js handlebars',
    stdout: false
  }).on('readable', function() {
    this.stdout.on('data', function(chunk) {
      if (/^Express server listening on port/.test(chunk)) {
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

// clean dev file
gulp.task('cleanDev', function() {
  del([path.join(conf.paths.dev, '/*')]);
});

// watch
gulp.task('watch', function() {
  gulp.watch(path.join(conf.paths.src, '/images/*'), ['devImages']);
  gulp.watch(path.join(conf.paths.src, '/styles/*.scss'), ['devStyles']);
  gulp.watch(path.join(conf.paths.src, '/scripts/*.js'), ['devScripts']);
});

gulp.task('development', ['devImages', 'devStyles', 'devScripts', 'devServer'], function() {
  gulp.start('watch');
});
