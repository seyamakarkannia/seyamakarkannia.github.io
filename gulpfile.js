var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin');
    deploy = require("gulp-gh-pages");

gulp.task('styles', function() {
    return gulp.src('src/sass/app.scss')
        .pipe(sass({ style: 'expanded' }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('build/css'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: 'build/',
        livereload: true
    });
});

gulp.task('watch', function() {
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/img/*', ['images']);
});


// -------------------------------------------------------------
// # Default task
// -------------------------------------------------------------

gulp.task('default', ['styles', 'js', 'images', 'connect', 'watch']);


// -------------------------------------------------------------
// # Deploy 'build' folder to master branch
// -------------------------------------------------------------

var options = {
    branch: "master"
};

gulp.task('deploy', function () {
    gulp.src("build/**/*.*")
        .pipe(deploy(options));
});
