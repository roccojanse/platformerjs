'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    del = require('del');

module.exports = function() {

    var srcPath = config.srcPath,  
        destPath = config.destPath,

        srcFiles = [
            srcPath + '/**/*.html'
        ];

    gulp.task('html:copy', function(done) {

        // cleanup
        del.sync([destPath + '/**/*[.html]']);

        gulp.src(srcFiles)
            .pipe(plumber(function(error) {
                gutil.log(error.message);
                this.emit('end');
            }))
            .pipe(gulp.dest(destPath))
            .on('end', done);
    });

    gulp.task('html:watch', function() {
        gulp.watch(srcFiles, ['html:copy', 'server:reload']);
    });
};