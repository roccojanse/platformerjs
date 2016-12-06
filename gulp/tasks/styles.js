'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssGlob = require('gulp-css-globbing'),
    cssNano = require('gulp-cssnano');

module.exports = function() {

    var srcPath = config.srcPath,  
        destPath = config.destPath + '/css';

    gulp.task('styles:build', function(done) {

        // cleanup
        del.sync([destPath + '*[.css, .css.map']);

        // build
        gulp.src(srcPath + '/*.scss')
            .pipe(sourcemaps.init())
            .pipe(cssGlob({
                extensions: ['.scss']
            }))
            .pipe(sass({
                outputStyle: 'expanded',
                defaultEncoding: 'utf-8',
                unixNewlines: false,
                errLogToConsole: true,
                stopOnError: false,
                cacheLocation: srcPath + '/.sass-cache',
                precision: 4,
                compass: false
            }).on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['> 5%', 'IE 11', 'last 3 version'], 
                cascade: false
            }))
            .pipe(cssNano({
                zindex: false
            }).on('error', sass.logError))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destPath))
            .on('end', done);
    });

    gulp.task('styles:watch', function() {
        gulp.watch(srcPath + '/**/*.scss', ['styles:build', 'server:reload']);
    });
};