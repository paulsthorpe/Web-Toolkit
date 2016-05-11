var gulp            = require('gulp'),
    gulp_util       = require('gulp-util'),
    gulp_browserify = require('gulp-browserify'),
    gulp_connect    = require('gulp-connect'),
    gulp_concat     = require('gulp-concat'),
    grs             = require('gulp-ruby-sass'),
    gulp_if         = require('gulp-if'),
    gulp_compass    = require('gulp-compass');

var env,
    jsSources,
    sassSources,
    htmlSources,
    outputDir,
    sassStyle;

env = 'development';

if (env==='development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded';
} else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
}

jsSources = [

  'components/js/script.js'
];

sassSources = ['components/sass/style.scss'];

htmlSources = [outputDir + '*.html'];

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(gulp_concat('scripts.js'))
    .pipe(gulp_browserify())
    .on('error', gulp_util.log)
    // .pipe(gulp_if(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(gulp_connect.reload());
    console.log("hello js");
});

gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(gulp_compass({
      sass: 'components/sass',
      css: outputDir + 'css',
      image: outputDir + 'images',
      style: sassStyle,
      require: ['susy', 'breakpoint']
    })
    .on('error', gulp_util.log))
//    .pipe(gulp.dest( outputDir + 'css'))
    .pipe(gulp_connect.reload());
    console.log("hello, compass");
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(['components/sass/*.scss', 'components/sass/*/*.scss'], ['compass']);
  gulp.watch('builds/development/*.html', ['html']);
});

gulp.task('connect', function() {
  gulp_connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('builds/development/*.html')
    // .pipe(gulpif(env === 'production', minifyHTML()))
    // .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
    .pipe(gulp_connect.reload());
});

// Copy images to production
gulp.task('move', function() {
  gulp.src('builds/development/images/**/*.*')
  .pipe(gulp_if(env === 'production', gulp.dest(outputDir+'images')));
});

gulp.task('default', ['watch', 'js', 'compass', 'connect']);
