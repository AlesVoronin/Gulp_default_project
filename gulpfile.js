var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync'),
    del = require('del');
//const {stream} = require('browser-sync');

gulp.task('sass', function() {
      return gulp.src('app/sass/**/*.+(scss|sass)').
          pipe(sass()).
          pipe(gulp.dest('app/css')).
          pipe(browserSync.reload({stream: true}));
    },
);

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app',
    },
    notify: false,
  });
});

gulp.task('watch', function() {
  gulp.watch('app/sass/**/*.+(scss|sass)', gulp.parallel('sass'));
  gulp.watch('app/*.html', gulp.parallel('code'));
  gulp.watch(['app/js/common.js', 'app/libs/**/*.js'],
      gulp.parallel('scripts'));
});

//JS & HTML
gulp.task('scripts', function() {
  return gulp.src(['app/js/common.js', 'app/libs/**/*.js']).
      pipe(browserSync.reload({stream: true}));
});

gulp.task('code', function() {
  return gulp.src('app/*.html').pipe(browserSync.reload({stream: true}));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));

//BUILD
gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('prebuild',async function() {
  var buildCss = gulp.src([
    'app/css/**/*'
  ]).pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('app/js/**/*').pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html').pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.parallel('prebuild', 'clean', 'scripts'));
