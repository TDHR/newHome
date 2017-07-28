var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var webpack = require('webpack-stream');
// var merge = require('merge-stream');
var named = require('vinyl-named');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var del = require('del');
var mergeJson = require('gulp-merge-json');

// images
gulp.task('devImages', function() {
  return gulp.src(path.join(conf.paths.src, '/images/**'))
    .pipe(plumber())
    .pipe(cache(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    })))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.dev, '/images')));
});

// styles
gulp.task('devStyles', function() {
  return gulp.src(path.join(conf.paths.src, '/styles/*.scss'))
    .pipe(plumber())
    .pipe(sass().on('error', conf.errorHandler('Sass')))
    .pipe(autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.dev, '/styles')));
});

// scripts
gulp.task('devScripts', function() {
  return gulp.src(path.join(conf.paths.src, '/scripts/*.js'))
    .pipe(plumber())
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

// libs
gulp.task('devLibs', function() {
  return gulp.src(path.join(conf.paths.src, '/libs/**'))
    .pipe(gulp.dest(path.join(conf.paths.dev, '/libs')));
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
  return del.sync([path.join(conf.paths.dev, '/*')]);
});

// livereload
gulp.task('livereload', function() {
  livereload.changed(__dirname);
});

// watch
gulp.task('watch', function() {
  gulp.watch(path.join(conf.paths.src, '/images/**'), ['devImages', 'livereload']);
  gulp.watch(path.join(conf.paths.src, '/styles/*.scss'), ['devStyles', 'livereload']);
  gulp.watch(path.join(conf.paths.src, '/styles/**/*.scss'), ['devStyles', 'livereload']);
  gulp.watch(path.join(conf.paths.src, '/scripts/*.js'), ['devScripts', 'livereload']);
  gulp.watch(path.join(conf.paths.src, '/scripts/**/*.js'), ['devScripts', 'livereload']);
  gulp.watch(path.join(conf.paths.locales, '/**/**/*.js'), ['locales', 'livereload']);
  gulp.watch(path.join(conf.paths.src, '/tpl/**/*.html'), ['tpl']);
});

gulp.task('development', ['devImages', 'devStyles', 'devScripts', 'devLibs'], function() {
  gulp.start('devServer')
  gulp.start('watch');
});
