var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

var eslintTask = require('./build/eslint');
var cleanTask = require('./build/clean');
var polyfillTask = require('./build/polyfill');
var scriptsTask = require('./build/scripts');

gulp.task('eslint', eslintTask);

gulp.task('polyfill', ['eslint'], polyfillTask);

gulp.task('scripts', ['eslint'], scriptsTask);

gulp.task('clean', ['polyfill', 'scripts'], cleanTask);

gulp.task('default', ['clean'], function () {});

