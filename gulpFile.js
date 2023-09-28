const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

gulp.task('minify-css', function () {
    return gulp.src(['assets/css/*.css','assets/external/Nouislider/*.css']) // Path to your CSS files
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets/css')); // Destination folder for minified CSS files
});

gulp.task('minify-js', function () {
    return gulp.src('assets/js/*.js') // Path to your JavaScript files
        .pipe(uglify())
        .pipe(gulp.dest('assets/js')); // Destination folder for minified JavaScript files
});

gulp.task('default', gulp.parallel('minify-css', 'minify-js'));