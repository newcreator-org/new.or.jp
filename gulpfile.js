const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');

gulp.task('scss', () => {
    const sass = require('gulp-sass')
    const cssnext = require('postcss-cssnext')
    const postcss = require('gulp-postcss')
    const processors = [cssnext({
        browsers: ['last 2 version']
    })]

    return gulp
        .src('./scss/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('css/'))
});

gulp.task('serve', done => {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html',
        },
    })
    done()
})

gulp.task('watch', () => {
    const browserReload = done => {
        browserSync.reload()
        done()
    }
    gulp.watch('./**/*', browserReload);
    gulp.watch('./*.html', browserReload);
    gulp.watch('./scss/**/*', gulp.series('scss'));
})

gulp.task('default', gulp.series('serve', 'watch'))
