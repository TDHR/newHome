var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var webpack = require('webpack-stream');
var merge = require('merge-stream');
var named = require('vinyl-named');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cached');
var del = require('del');
var util = require('gulp-util');
var csso = require('gulp-csso');

// 处理图片
gulp.task('prodImages', function() {
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
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/images')));
  return merge(min);
});

// styles
gulp.task('prodStyles', function() {
  return gulp.src(path.join(conf.paths.src, '/styles/*.scss'))
    .pipe(plumber())
    .pipe(cache('styles'))
    .pipe(sass().on('error', conf.errorHandler('Sass')))
    .pipe(autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(csso())
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/styles')));
});

// scripts
gulp.task('prodScripts', function() {
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
    .pipe(uglify().on('error', conf.errorHandler('Uglify *.js')))
    .pipe(plumber.stop())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/scripts')));
});

// clean dist file
gulp.task('cleanDist', function() {
  del([path.join(conf.paths.dist, '/*')]);
});

// copy tmp to dist
gulp.task('renewDist', function() {
    return gulp.src(path.join(conf.paths.tmp, '/**'))
        .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('production', ['prodImages', 'prodStyles', 'prodScripts'], function() {
  gulp.start('cleanDist');
  gulp.start('renewDist');
  util.log(util.colors.green('Build success!'));
});
