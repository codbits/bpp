var gulp = require('gulp')
var fs = require('fs')
var newer = require('gulp-newer')
var browserSync = require('browser-sync').create()
var sass = require('gulp-sass')
var pug = require('gulp-pug')
var pugLinter = require('gulp-pug-linter')
var autoprefixer = require('gulp-autoprefixer')
var plumber = require('gulp-plumber')
// var gulpIf = require('gulp-if')
var watch = require('gulp-watch')
var standard = require('gulp-standard')
var $ = require('gulp-load-plugins')()
var _ = require('lodash')
var converter = require('number-to-words')
var del = require('del')

var development = $.environments.development
var production = $.environments.production

var config = JSON.parse(fs.readFileSync('./config.json'));
config.baseUrl = development() ? config.urls.development : config.urls.production
config.environment = development() ? 'development' : 'production'

var tags = {};

_.forEach(config.items, function(item) {
  _.forEach(item.tags, function(tag){

    if (tags[tag]) {
      tags[tag] = Number(tags[tag]) + 1;
      return;
    }

    tags[tag] = 1;
  })
});

config.tags = tags

gulp.task('serve', [ 'html', 'imgs', 'scss', 'js' ], () => {
  browserSync.init({
    server: './docs/',
    open: false,
    reloadDelay: 500
  });

  gulp.watch('./src/**/*.pug', [ 'html' ]);
  gulp.watch('./src/**/*.{png,gif,jpg,svg}', [ 'imgs' ]);
  gulp.watch('./src/**/*.scss', [ 'scss' ]);
  gulp.watch('./src/**/*.js', [ 'js' ]);
});

gulp.task('html', () => {
  return gulp
    .src([ '!./src/includes/**', './src/**/*.pug' ])
    .pipe(plumber())
    .pipe(newer('./docs'))
    .pipe(pugLinter())
    .pipe(pugLinter.reporter())
    .pipe(pug({
      data: config,
      locals: {
        _,
        converter
      },
      filters: {
        'randomProperty': function (obj) {
          var keys = Object.keys(obj)
          return obj[keys[ keys.length * Math.random() << 0]];
        }
      }
    }))
    .pipe($.htmlPrettify({
      indent_size: 2
    }))
    .pipe(gulp.dest('./docs'))
    .pipe(browserSync.stream());
});

gulp.task('imgs', () => {
  return gulp
    .src('./src/**/*.{png,gif,jpg,svg}')
    // .pipe($.imagemin())
    .pipe(gulp.dest('./docs'))
    .pipe(browserSync.stream());
  });

gulp.task('scss', () => {
  return gulp
    .src('./src/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        browsers: [ 'last 2 versions' ],
        cascade: false
      })
    )
    .pipe(newer('./docs'))
    .pipe(gulp.dest('./docs'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp
    .src('./src/**/*.js')
    // .pipe(standard())
    // .pipe(
    //   standard.reporter('default', {
    //     breakOnError: false,
    //     quiet: true
    //   })
    // )
    .pipe(newer('./docs'))
    .pipe(gulp.dest('./docs'))
    .pipe(browserSync.stream());
});

gulp.task('clean', () => {
  return del(['docs']);
});

gulp.task('default', $.sequence('clean', 'serve'));

gulp.task('publish', $.sequence('clean', 'html', 'imgs', 'scss', 'js'));
