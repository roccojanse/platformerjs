'use strict';

var config = require('../config.js'),
    gulp = require('gulp'),
    del = require('del'),
    jsdoc = require('gulp-jsdoc3');

module.exports = function() {

    var srcPath = config.srcPath,  
        destPath = config.destPath + '/docs',

        srcFiles = ['./README.md', srcPath + '/**/*.js'];

    gulp.task('docs:js', function(done) {

        // cleanup
        del.sync([destPath + '/**/*.*']);

        var cfg = {
            "tags": {
                "allowUnknownTags": true
            },
            "opts": {
                "destination": destPath
            },
            "plugins": [
                "plugins/markdown"
            ],
            "templates": {
                "cleverLinks": false,
                "monospaceLinks": false,
                "outputSourceFiles": true,
                "outputSourcePath": true,
                "path": "ink-docstrap",
                "theme": "cerulean",
                "navType": "vertical",
                "linenums": true,
                "dateFormat": "MMMM Do YYYY, h:mm:ss a"
            }
        }

        gulp.src(srcFiles, {
            read: false
        })
        .pipe(jsdoc(cfg, done));
    });

    gulp.task('docs:js:watch', function() {
        gulp.watch(srcFiles, ['docs:js', 'server:reload']);
    });
};