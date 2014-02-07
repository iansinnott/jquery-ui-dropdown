// Good reads on gulp:
// http://markgoodyear.com/2014/01/getting-started-with-gulp/
// https://github.com/gulpjs/gulp/blob/master/docs/recipes/using-multiple-sources-in-one-task.md

// Require all the gulp modules we will be using.
var gulp = require('gulp'), // Required
    gutil = require('gulp-util'), // Required (maybe?)
    es = require('event-stream'), // For using multiple src calls
    sass = require('gulp-sass'), // Hooks into node-sass
    autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'), // minify images
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'), // Suffixing files with .min
    cache = require('gulp-cache'), // Cache already-processed files
    clean = require('gulp-clean'), // Clean up files (delete them)
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'), // Required for livereload
    server = lr() // Instantiate the server

// SCSS compilation and relaod
gulp.task('sass', function() {
  return gulp.src('sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ))
    .pipe(gulp.dest('css'))
    .pipe(livereload(server))
})

// JS linting, concatenation and reload
gulp.task('js', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(browserify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(''))
    .pipe(livereload(server))
})

// Image minification. Only watch changed images.
gulp.task('images', function() {
  return gulp.src('images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
})

// Remove any files that were removed from the main app from dist
gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/img'], {read: false})
    .pipe(clean())
})

// Do the housekeeping to prepare the app for distribution. Minify, 
// concat, lint, etc.
gulp.task('dist', function() {
  return es.concat(
    // Sass
    gulp.src('sass/**/*.scss')
      .pipe(sass())
      .pipe(autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ))
      .pipe(gulp.dest('css'))
      .pipe(rename('style.min.css'))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/css')),

    // JS
    gulp.src('js/**/*.js')
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'))
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest(''))
      .pipe(rename('bundle.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js')),

    // Images
    gulp.src('images/**/*')
      .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
      .pipe(gulp.dest('dist/img'))
    )
})

// Watch files and reload if changed.
gulp.task('watch', function() {

  // Set up to listen on port 35729.
  // (the default. Necessary for the LR chrome plugin)
  server.listen(35729, function(err) {

    if (err)
      return console.log(err)

    // The actual watch statements
    gulp.watch('sass/**/*.scss', ['sass'])
    gulp.watch('js/**/*.js', ['js'])
    gulp.watch('images/**/*', ['img'])

  })
})

// The 'default' task will be run when we call 'gulp' from the commadn line.
gulp.task('default', ['clean'], function() {
  gulp.start('dist')
});