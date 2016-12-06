'use strict';

var config = require('./gulp/config.js'),
    fs = require('fs'),
    gulp = require('gulp');

/**
 * gets all tasks
 * @private
 */
var getAllTasks = function() {
    var path = config.gulpTaskPath;
    var files = fs.readdirSync(path);
    files.forEach(function(file, i) {
        require(path + '/' + file)();
    });
};

getAllTasks();

gulp.task('default', ['scripts:build', 'html:copy']);
gulp.task('server', ['server:start']);