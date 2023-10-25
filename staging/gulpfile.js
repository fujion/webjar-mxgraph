const {src, dest, series} = require('gulp');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const download = require("gulp-download-stream");
const unzip = require('gulp-unzip');
const streamify = require('gulp-streamify');

const srcDir = `${webjar.staging}/mxgraph-${version.unrevise}/`;
const destDir = '${webjar.target}/';
const header = '${webjar.staging}/header.js';

function task0() {
    return download(`https://github.com/jgraph/mxgraph/archive/v${version.unrevise}.zip`)
        .pipe(streamify(unzip()))
        .pipe(dest('./'));
}

function task1() {
    return _copy(['LICENSE', '*.md']);
}

function task2() {
    return _copy('javascript/src/images/**', 'dist/images');
}

function task3() {
    return _copy('javascript/src/resources/**', 'dist/resources');
}

function task4() {
    return _concat([header, 'javascript/mxClient.js'], 'mxClient.js', 'dist');
}

function task5() {
    return _concat([header, 'javascript/mxClient.min.js'], 'mxClient.min.js', 'dist');
}

function task6() {
    return _minifyCSS('javascript/src/css/*.css', 'dist/css')
}

function _toSrc(_src) {
    return src(_src, {allowEmpty: false, cwd: srcDir});
}

function _toDest(_dest) {
    return dest(_dest || '.', {cwd: destDir});
}

function _concat(_src, _final, _dest) {
    console.log('  Concatenating ' + _src);
    return _toSrc(_src)
        .pipe(concat(_final))
        .pipe(_toDest(_dest))
}

function _copy(_src, _dest) {
    console.log('  Copying ' + _src);
    return _toSrc(_src).pipe(_toDest(_dest))
}

function _minifyCSS(_src, _dest) {
    console.log('  Minifying ' + _src);
    return _toSrc(_src)
        .pipe(_toDest(_dest))
        .pipe(rename(path => path.extname = '.min.css'))
        .pipe(minifyCSS())
        .pipe(_toDest(_dest))
}

exports.default = series(task0, task1, task2, task3, task4, task5, task6);
