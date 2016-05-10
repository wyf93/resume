var gulp         = require('gulp'),
    less         = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync').create(),
    reload       = browserSync.reload;
    
    gulp.task('serve', ['less'], function () {
      browserSync.init({
        server: './src'
      });
      
      gulp.watch('src/less/**/*.less', ['less']);
      gulp.watch('src/*.html').on('change', reload);
    });
    
    gulp.task('less', function () {
      gulp.src('src/less/common.less')
          .pipe(less())
          .pipe(autoprefixer())
          .pipe(gulp.dest('src/dist/css'))
          .pipe(reload({stream: true}));
    });
    
    gulp.task('default', ['serve']);
