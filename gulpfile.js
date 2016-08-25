'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const cached = require('gulp-cached');
const remember = require('gulp-remember');

const bebelFiles = ['temp/**/*.js'],
    destPath = 'build';

gulp.task('babel', () => {
    return gulp.src(bebelFiles)
        .pipe(cached('babel'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(remember('babel'))
        .pipe(gulp.dest(destPath));
});

gulp.task('watch', ['babel'], () => {
    gulp.watch('temp/**/*.js', ['babel']);
});