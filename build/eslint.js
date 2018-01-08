var gulp = require('gulp');
var eslint = require('gulp-eslint');
var $if = require('gulp-if');
var browserSync = require('browser-sync');

function eslintTask () {
  console.log('eslint start ...');
  gulp.src(['src/**/*.js', '!src/Vue/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe($if(!browserSync.active, eslint.failAfterError()));
}

module.exports = eslintTask;
