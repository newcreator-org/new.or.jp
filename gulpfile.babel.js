const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('babel', () => {
  return gulp
    .src('js/*.js')
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('js/bundle/'));
});

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

gulp.task('build',
  gulp.parallel('babel', 'scss')
);

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
  gulp.watch('./index.html', browserReload);
  gulp.watch('./js/*', gulp.series('babel'));
  gulp.watch('./scss/*', gulp.series('scss'));
})

gulp.task('default', gulp.series('serve', 'watch'))