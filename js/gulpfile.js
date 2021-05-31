var gulp = require('gulp');
var gulpless = require('gulp-less');
var gulpautoprefixer = require('gulp-autoprefixer');
 
  //Creating a Style task that convert LESS to CSS
  var srcfile = '../css/*.less';

function styles(){
      var temp = '../tmp';
          return gulp
                 .src(srcfile)
                 .pipe(gulpless())
                 .pipe(gulpautoprefixer())
                 .pipe(gulp.dest(temp));
  };

  gulp.task('default',function() {
    gulp.watch(`${srcfile}`, styles);
  });