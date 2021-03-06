'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
    browserSync = require('browser-sync').create();

module.exports = function() {

    var destPath = config.destPath;

    gulp.task('server:start', function(done) {

        browserSync.emitter.on('browser:reload', function() {
            console.log('Server reloaded on ' + new Date().toLocaleString('nl-NL', 'Europe/Amsterdam'));
        });

        browserSync.emitter.on('service:exit', function () {
            console.log('Server stopped.');
            done();
        });

        browserSync.emitter.on('init', function () {
            //done();
        });

        browserSync.init({
            server: {
                baseDir: destPath
            },
            ui: false,
            open: false,
            notify: false,
            reloadDelay: 1000
        });
    });

    gulp.task('server:reload', function(done) {
        browserSync.reload();
    });

    gulp.task('server:stop', function(done) {
        browserSync.exit();
    });
};