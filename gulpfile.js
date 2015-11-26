var gulp = require('gulp'),
    tinify = require('gulp-tinify'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

gulp.task('tinify', function () {
    gulp.src('static/img/**/*')
        .pipe(tinify('GHqPaya9P3oxqZNV6dv4Hry_kBePlZqW'))
        .pipe(gulp.dest('dest/img'));
});

gulp.task('imagemin', function () {
    gulp.src('static/img/**/*')
        .pipe(imagemin({
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dest-imagemin/img'));
});