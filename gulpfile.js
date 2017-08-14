const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const notify = require('gulp-notify');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');


gulp.task('build', () => {
    return gulp.src(['static/**/*.js', '!static/js/dist/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('static/js/dist/'))
        .pipe(notify({message : 'Js files successfully concatenated and reduced'}));
});

gulp.task('watch', () => {
    gulp.watch('static/**/*.js', ['build']);
});