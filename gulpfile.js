//var gulp   = require('gulp'),
//		concat = require('gulp-concat'),
//		uglify = require('gulp-uglify');
//
//gulp.task('scripts', function() {
//	return gulp.src([
//		'libs/**/*.js',
//		'src/js/hello-module.js', 
//		'src/js/**/*.js'])
//		.pipe(concat('all.js'))
//		.pipe(uglify())
//		.pipe(gulp.dest('public/js'))
//});
//
//gulp.task('styles', function() {
//	return gulp.src([
//		'libs/**/*.css',
//		'src/css/*.css'
//		])
//		.pipe(concat('all.css'))
//		.pipe(gulp.dest('public/css'))
//});
//
//gulp.task('default', ['scripts', 'styles']);
//
////gulp.watch(['src/**/*.js', 'src/**/*.css'], ['default'])