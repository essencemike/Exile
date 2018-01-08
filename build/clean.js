var gulp = require('gulp');
var del = require('del');

function clean () {
  console.log('clean start ...');
  del(['dist/*'], { dot: true });
}

module.exports = clean;
