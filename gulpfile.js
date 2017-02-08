'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
// const sourcemaps = require('gulp-sourcemaps');
const cached = require('gulp-cached');
const remember = require('gulp-remember');

const bebelFiles = ['server/**/*.js'],
    destPath = 'build';

gulp.task('clean', () => {
    return gulp.src(destPath + '/**', { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('babel', () => {
    return gulp.src(bebelFiles)
        .pipe(cached('babel'))
        // .pipe(sourcemaps.init())
        .pipe(babel({
            // presets: [
            //     "latest"
            // ],
            plugins: [
                // "transform-runtime",
                "transform-es2015-modules-commonjs"
            ]
        }))
        // .pipe(sourcemaps.write('.'))
        .pipe(remember('babel'))
        .pipe(gulp.dest(destPath));
});

gulp.task('watch', ['babel'], () => {
    gulp.watch('server/**/*.js', ['babel']);
});