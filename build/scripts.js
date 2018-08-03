var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var newer = require('gulp-newer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var size = require('gulp-size');

function scriptsTask () {
  console.log('scripts start ...');
  gulp.src(['src/main.js'])
    .pipe(sourcemaps.init())
    .pipe(gulpBabel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('.tmp/js'))
    .pipe(concat('main.js'))
    // .pipe(uglify({ preserveComments: 'some' }))
    .pipe(size({ title: 'js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('.tmp/js'));
}

module.exports = scriptsTask;
