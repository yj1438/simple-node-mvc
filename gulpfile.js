'use strict';

const path = require('path');

const gulp = require('gulp');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
// const sourcemaps = require('gulp-sourcemaps');
const cached = require('gulp-cached');
// const remember = require('gulp-remember');
const respawn = require('respawn');
const del = require('del');

const bebelFiles = ['server/**/*.js',],
    destPath = 'build';

const env = process.env;
env.NODE_PATH = env.NODE_PATH || path.resolve(__dirname, destPath);
env.NODE_ENV = env.NODE_ENV || 'development';

function clean () {
    return del([ destPath, ]);
}

function moveSSL () {
    return gulp.src('server/SSL/*', {base: 'server',})
        .pipe(gulp.dest(destPath));
}

function moveTpl () {
    return gulp.src('server/views/**/*.html', {base: 'server',})
        .pipe(cached('tpl'))
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
                "transform-class-properties",
            ],
        }))
        // .pipe(sourcemaps.write('.'))
        // .pipe(remember('babel'))
        .pipe(gulp.dest(destPath));
}

function startServer (done) {
    const command = [ 'node', '--harmony', ];
    command.push('spdy.js');

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

    const watch = gulp.watch(bebelFiles, (watchDone) => {
        gutil.log(`Watch project is doing ...`);
        watchDone();
    });
    watch.on('change', (evt) => {
        gutil.log(`File change : ${evt}`);
        let isError;
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
    done();
}

/**
 * 默认任务
 * @module gulp#4.0
 */
gulp.task('default', gulp.series(
	// 第一步：clean
    clean,
    // 第二步：babel
    babelFn,
	// 第三步：编译 + 移动模板
	gulp.parallel(moveSSL, moveTpl),
	// 第四步：启动服务
	startServer
));