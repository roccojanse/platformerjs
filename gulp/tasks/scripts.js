'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
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
            .pipe(plumber(function(error) {
                gutil.log(error.message);
                this.emit('end');
            }))
            .pipe(sourcemaps.init())
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(babel({ presets: ['latest'] }))
            .pipe(uglify({ mangle: false }))
            .pipe(concat(fileName + '.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(destPath))
            .on('end', done);
    });

    gulp.task('scripts:watch', function() {
        gulp.watch(srcPath + '/**/*.js', ['scripts:build', 'server:reload']);
    });
};