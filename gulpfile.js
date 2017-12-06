var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

gulp.task("server", function () {
  return browser.init({
    server: {
      baseDir: "./"
    }
  });
});
gulp.task("html", function () {
  gulp.src("**/*.html")
    .pipe(plumber())
    .pipe(browser.reload({ stream: true }));
});
gulp.task("sass", function () {
  gulp.src("sass/**/*.scss")
    .pipe(plumber())
    .pipe(sass({ 
      includePaths: require('node-reset-scss').includePath,
      outputStyle: 'compact' }))
    .pipe(autoprefixer({
      browsers: ['last 2 version'],
      cascade: false
    }))
    .pipe(gulp.dest("./css/"))
    .pipe(browser.reload({ stream: true }));
});
gulp.task("sass_watch", function () {
  gulp.watch("sass/**/*.scss", ["sass"]);
});
gulp.task("default", ['server'], function () {
  gulp.watch("sass/**/*.scss", ["sass"]);
  gulp.watch("**/*.html", ["html"]);
});