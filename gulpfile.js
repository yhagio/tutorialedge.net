const gulp = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

let paths = {
  styles: {
    // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
    src: "./static/**/*.scss",
    // Compiled files will end up in whichever folder it's found in (partials are not compiled)
    dest: "static/app/",
    destFile: "style.css",
  }
};

function watch() {
  buildCSS();
  gulp.watch(paths.styles.src, buildCSS);
}

function buildCSS() {
  return (
    gulp
      .src(paths.styles.src)
      .pipe(sass())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(concat(paths.styles.destFile))
      .pipe(gulp.dest(paths.styles.dest))
  );
}

exports.watch = watch;
exports.default = buildCSS;