var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var del = require('del');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

gulp.task('compile', function(){
  return gulp.src(['js/!*.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./'))
});

gulp.task('clean', function () {
  return del(['all.js', '!public']);
});

gulp.task('sass', function (done) {
  gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));

  done();
});

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('sass/*.scss', gulp.series(['sass']));
  gulp.watch(["*.html", "./pages/*.html", "./js/*.js", "*.css", "./sass/*.scss"]).on("change", reload);
});

gulp.task('build', gulp.series('clean', 'compile'));
