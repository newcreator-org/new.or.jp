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
        .src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css/'))
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
    gulp.watch('./dist/**/*', browserReload);
    gulp.watch('./*.html', browserReload);
    gulp.watch('./src/scss/**/*', gulp.series('scss'));
})

gulp.task('default', gulp.series('serve', 'watch'))
