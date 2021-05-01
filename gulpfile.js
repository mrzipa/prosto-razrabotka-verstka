const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const cleanCSS = require('gulp-clean-css')

function style() {
  return src('./src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(dest('./src/css/'))
    .pipe(browserSync.stream())
}

function watcher() {
  browserSync.init({
    server: {
      baseDir: './src',
    },
  })
  watch('./src/css/**/*.scss', style)
  watch('./src/*.html').on('change', browserSync.reload)
  watch('./src/js/**/*.js').on('change', browserSync.reload)
}

exports.style = style
exports.watch = watcher
