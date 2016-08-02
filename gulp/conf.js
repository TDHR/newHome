'use strict';

var gutil = require('gulp-util');

exports.paths = {
    config: 'config',
    app: 'public/app',
    dev: 'public/dev',
    dist: 'public/dist',
    tmp: 'tmp'
};

exports.errorHandler = function(title) {
    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};