'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

module.exports = function() {

    var srcPath = config.srcPath,  
        destPath = config.destPath + '/assets',

        srcFiles = [
            srcPath + '/assets/**/*[.jpg,.png,.svg]'
        ];

    
    gulp.task('images:copy', function(done) {

        gulp.src(srcFiles)
            .pipe(plumber(function(error) {
                gutil.log(error.message);
                this.emit('end');
            }))
            .pipe(changed(destPath))
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                use: [pngquant()]
            }))
            .pipe(gulp.dest(destPath))
            .on('end', done);
    });  

    gulp.task('images:watch', function() {
        gulp.watch(srcFiles, ['images:copy', 'server:reload']);
    }); 
};