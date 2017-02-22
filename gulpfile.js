'use strict';

const path = require('path');

const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
// const sourcemaps = require('gulp-sourcemaps');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const respawn = require('respawn');
const del = require('del');

const bebelFiles = ['server/**/*.js'],
    destPath = 'build';

const env = process.env;
env.NODE_PATH = env.NODE_PATH || path.resolve(__dirname, destPath);
env.NODE_ENV = env.NODE_ENV || 'development';

gulp.task('clean', () => {
    return del([ destPath ]);
});

function moveSSL () {
    return gulp.src('server/SSL/*', {base: 'server'})
        .pipe(gulp.dest(destPath));
}

function babelFn () {
    return gulp.src(bebelFiles)
        .pipe(cached('babel'))
        // .pipe(sourcemaps.init())
        .pipe(babel({
            // presets: [
            //     "latest"
            // ],
            plugins: [
                // "transform-runtime",
                "transform-es2015-modules-commonjs",
                "transform-class-properties"
            ]
        }))
        // .pipe(sourcemaps.write('.'))
        .pipe(remember('babel'))
        .pipe(gulp.dest(destPath));
}

gulp.task('babel', ['clean'], () => {
    return babelFn();
});

gulp.task('default', ['babel'], () => {

    moveSSL();

    const command = [ 'node', '--harmony', ];
    command.push('http2.js');

    const monitor = respawn(command, {
        env,
        cwd: destPath,
        maxRestarts: 10,
        sleep: 300,
        stdio: 'inherit',
    });
    monitor
        .on('stdout', (data) => console.log(data.toString()))
        .on('stderr', (err) => console.error(err.toString()));

    monitor.start();
    

    function restartMonitor () {
        monitor.stop(() => monitor.start());
    }

    let isError;
    const watch = gulp.watch(bebelFiles, (done) => {
        gutil.log(`Watch project is doing ...`);
    });
    watch.on('change', (evt) => {
        gutil.log(`File change : ${evt.path}`);
        babelFn()
            .on('error', () => {
                isError = true;
            })
            .on('end', () => {
                if (isError) {
                    return;
                }
                restartMonitor();
            });
    });
});