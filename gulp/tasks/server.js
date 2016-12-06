'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create();

module.exports = function() {

    var destPath = config.destPath;

    gulp.task('server:start', function(done) {

        browserSync.init({
            server: {
                baseDir: destPath
            },
            ui: false,
            open: false,
            notify: false,
            reloadDelay: 1000
        });

        browserSync.emitter.on('init', function () {
            done();
        });
    });

    gulp.task('server:reload', function(done) {
        browserSync.reload();
        browserSync.emitter.on('reload', function () {
            done();
        });
    });

    gulp.task('server:stop', function(done) {
        browserSync.exit();
        browserSync.emitter.on('exit', function () {
            done();
        });
    });
};