var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack2 = require('webpack');
var config = require('./config.js');

/*gulp.task('webpack', function() {
  console.log('Bundling Code');

  return gulp.src('src/app/' + config.libraryName + '/index.js')
    .pipe(webpackStream(require('./webpack.production.config.js'), webpack2))
    .pipe(gulp.dest('dist/'));
});*/

gulp.task('bundle-resources', function() {
  console.log('Bundling Resources');

  return gulp.src('src/resources/**/*')
    .pipe(gulp.dest('dist/resources/'));
});

gulp.task('build', [/*'webpack', */'bundle-resources'], function() {
  console.log('Building');
});