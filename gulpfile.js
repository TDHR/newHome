'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var conf = require('./gulp/conf');

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'del']
});

var tail = Math.random().toString(36).substr(2);

gulp.task('dev', ['cleanDev'], function() {
    gulp.start('development');
});

gulp.task('pro', ['cleanTmp'], function() {
    gulp.start('production');
});
