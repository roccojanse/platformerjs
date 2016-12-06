'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify');     

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
            .pipe(uglify({ 
                mangle: false 
            }).on('error', gulpUtil.log))
            .pipe(concat(fileName + '.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destPath))
            .on('end', done);
    });

    gulp.task('scripts:watch', function() {
        gulp.watch(srcPath + '/**/*.js', ['scripts:build', 'server:reload']);
    });
};