var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var del = require('del');
var util = require('gulp-util');
var csso = require('gulp-csso');

// images
gulp.task('betaImages', function() {
  return gulp.src(path.join(conf.paths.src, '/images/**'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/images')));
});

// styles
gulp.task('betaStyles', function() {
  return gulp.src(path.join(conf.paths.src, '/styles/*.scss'))
    .pipe(sass().on('error', conf.errorHandler('Sass')))
    .pipe(autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(csso())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/styles')));
});

// scripts
gulp.task('betaScripts', function() {
  return gulp.src(path.join(conf.paths.src, '/scripts/*.js'))
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
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/scripts')));
});

// libs
gulp.task('betaLibs', function() {
  return gulp.src(path.join(conf.paths.src, '/libs/**'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/libs')));
});

// copy MP_verify_3TLkdnPeXo8BPm7Y.txt
gulp.task('betaMP', function() {
  return gulp.src(path.join(conf.paths.src, 'MP_verify_3TLkdnPeXo8BPm7Y.txt'))
    .pipe(gulp.dest(conf.paths.tmp));
});

// clean beta file
gulp.task('cleanBeta', function() {
  return del.sync([path.join(conf.paths.beta, '/*')]);
});

// copy tmp to beta
gulp.task('renewBeta', ['cleanBeta'], function() {
  return gulp.src(path.join(conf.paths.tmp, '/**'))
    .pipe(gulp.dest(conf.paths.beta));
});

gulp.task('runbeta', ['betaImages', 'betaStyles', 'betaScripts', 'betaLibs', 'betaMP'], function() {
  gulp.start('renewBeta');
  util.log(util.colors.green('Build beta success!'));
});
