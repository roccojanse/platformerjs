'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    del = require('del'),
    rename = require('gulp-rename'),
    filter = require('gulp-filter'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    strip = require('gulp-strip-comments');

module.exports = function() {
    
    gulp.task('vendor:build', function(done) {

    var srcPath = config.srcPath,  
        destPath = config.destPath;

        // cleanup
        del.sync([
            destPath + '/js/vendor/**/*.js',
            destPath + '/css/vendor/**/*.css'
        ]);

        for (var lib in config.vendor) {

            // filters
            var filterScripts = filter(['**/*.js', '**/*.min.js']),
                filterScriptsMin = filter(['**/*.js', '!**/*.min.js'], { restore: true }),
                filterStyles = filter(['*.css', '*.min.css']),
                filterStylesMin = filter(['*.css', '!*.min.css'], { restore: true });

            // build
            gulp.src(config.vendor[lib])
                .pipe(filterScripts)
                .pipe(filterScriptsMin)
                .pipe(uglify({ 
                    mangle: false 
                }).on('error', gulpUtil.log))
                .pipe(filterScriptsMin.restore)
                .pipe(concat(lib + '.js')
                .on('error', gulpUtil.log))
                .pipe(strip())
                .pipe(rename({ 
                    suffix: '.min' 
                }))
                .pipe(gulp.dest(destPath + '/js/vendor'));

            gulp.src(config.vendor[lib])  
                .pipe(filterStyles)
                .pipe(filterStylesMin)
                .pipe(cssnano({
                    zindex: false
                })
                .on('error', gulpUtil.log))
                .pipe(filterStylesMin.restore)
                .pipe(concat(lib + '.css')
                .on('error', gulpUtil.log))
                .pipe(rename({ 
                    suffix: '.min' 
                }))
                .pipe(gulp.dest(destPath + '/css/vendor'));
        }

        done();
    });
};