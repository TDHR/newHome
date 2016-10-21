var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var webpack = require('webpack-stream');
// var merge = require('merge-stream');
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
gulp.task('prodImages', function() {
  return gulp.src(path.join(conf.paths.src, '/images/*'))
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
gulp.task('prodStyles', function() {
  return gulp.src(path.join(conf.paths.src, '/styles/*.scss'))
    .pipe(sass().on('error', conf.errorHandler('Sass')))
    .pipe(autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
    .pipe(csso())
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/styles')));
});

// scripts
gulp.task('prodScripts', function() {
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
gulp.task('prodLibs', function() {
  return gulp.src(path.join(conf.paths.src, '/libs/**'))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/libs')));
});

// clean tmp file
gulp.task('cleanTmp', function() {
  return del.sync([path.join(conf.paths.tmp, '/*')]);
});


// clean dist file
gulp.task('cleanDist', function() {
  return del.sync([path.join(conf.paths.dist, '/*')]);
});

// copy tmp to dist
gulp.task('renewDist', ['cleanDist'], function() {
  return gulp.src(path.join(conf.paths.tmp, '/**'))
    .pipe(gulp.dest(conf.paths.dist));
});

gulp.task('production', ['prodImages', 'prodStyles', 'prodScripts', 'prodLibs'], function() {
  gulp.start('renewDist');
  util.log(util.colors.green('Build success!'));
});
