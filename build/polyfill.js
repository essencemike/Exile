var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

function polyfill () {
  console.log('polyfill start ...');
  gulp.src('src/Polyfill/**/*.js')
    .pipe(concat('polyfill.js'))
    .pipe(uglify())
    .pipe(rename('polyfill.min.js'))
    .pipe(gulp.dest('dist/'));
}

module.exports = polyfill;
