'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint');
    // rename = require('gulp-rename'),
    // cache = require('gulp-cached'),
    // remember = require('gulp-remember'),
    // sourcemaps = require('gulp-sourcemaps'),
    // jshint = require('gulp-jshint'),    
    // concat = require('gulp-concat'),       
    // uglify = require('gulp-uglify'),      
    // jsdoc = require('gulp-jsdoc3');

module.exports = function() {

    var fileName = config.fileName,
        srcPath = config.srcPath,  
        destPath = config.destPath + '/js',

        srcFiles = [
            srcPath + '/**/!(Game).js',
            srcPath + '/Game.js'
        ];

    gulp.task('scripts:build', function(done) {

        // cleanup
        del.sync([destPath + '/**/*[.js, .js.map]']);

        gulp.src(srcFiles)
            .pipe(sourcemaps.init())
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(babel({
                presets: ['latest'],
                plugins: ['transform-es2015-template-literals']
            }))
            .pipe(concat(fileName + '.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destPath))
            .on('end', done);

        // // build
        // gulp.src(srcGlob)
        //     .pipe(sourcemaps.init())
        //     .pipe(cache(cacheName))
        //     .pipe(jshint())
        //     .pipe(jshint.reporter('jshint-stylish'))
        //     .pipe(remember(cacheName))
        //     .pipe(uglify({ 
        //         mangle: false 
        //     }).on('error', gulpUtil.log))
        //     .pipe(concat(fileName + '.js')
        //     .on('error', gulpUtil.log))
        //     .pipe(rename({ 
        //         suffix: '.min' 
        //     }))
        //     .pipe(sourcemaps.write('.'))
        //     .pipe(gulp.dest(dest));
    });
};