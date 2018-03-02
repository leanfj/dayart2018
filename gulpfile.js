var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: {
            baseDir: "./",
            directory: false
        },
    });

    gulp.watch("sass/**/*.sass", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("sass/**/*.sass")
        .pipe(sass())
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});

//Concatenar Javascript
var jquery = 'node_modules/jquery/dist/jquery.js';
var bootstrap = 'node_modules/bootstrap/dist/js/bootstrap.js';
var mainJS = 'js/main.js'

gulp.task('concatjs', function () {
    return gulp.src([jquery, bootstrap, mainJS])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./js/'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/'));
});

gulp.task('default', ['serve']);