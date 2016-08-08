var path = require('path');
var gulp = require('gulp');
var wrench = require('wrench');
var conf = require('./gulp/conf');
var merge = require('merge-stream');
var mergeJson = require('gulp-merge-json');

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});

// locales 
gulp.task('locales', function() {
    var lang = ['zh', 'en'];
    for (var i = 0; i < lang.length; i++) {
        lang[i] = gulp.src(path.join(conf.paths.locales, '/' + lang[i] + '/*.js'))
            .pipe(mergeJson(lang[i] + '.js'))
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