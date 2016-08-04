var gutil = require('gulp-util');

exports.paths = {
    src: 'public/src',
    dev: 'public/dev',
    dist: 'public/dist',
    tmp: 'public/tmp'
};

exports.errorHandler = function(title) {
    return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        this.emit('end');
    };
};