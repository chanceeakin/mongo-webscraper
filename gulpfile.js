'use strict';

const gulp = require('gulp'),
	sass = require('gulp-sass'),
	nodemon = require('gulp-nodemon');

gulp.task('hello', function() {
  console.log('Hello Zell');
});

gulp.task('sass', function(){
  return gulp.src('bower_components/materialize/sass/materialize.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('public/css'))
});

gulp.task('start', function () {
  nodemon({
    script: 'index.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('watch', function(){
  gulp.watch('bower_components/materialize/sass/materialize.scss', ['sass']); 
  // Other watchers
})