'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
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
            .pipe(gulp.dest(destPath))
            .on('end', done);

    });
};