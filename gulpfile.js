const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sourcemap = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));

function comprimirJS(){
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
}

function comprimirSass(){
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemap.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemap.write('./maps'))
        .pipe(gulp.dest('./build/styles'))
}

function comprimirImage(){
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
}

exports.default = function () { 
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(comprimirSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimirJS));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimirImage));
 }