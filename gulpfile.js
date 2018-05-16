const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('default', ['copy-html', 'styles','copy-fonts', 'copy-jasmine'], function(){
  gulp.watch('./src/sass/**/*.scss', ['styles']);
	gulp.watch('./src/index.html',['copy-html']);

	browserSync.init({
		server: './dist'
	});

})

gulp.task('styles', function () {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('copy-html', function(){
  gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.stream());
});

gulp.task('copy-fonts', function(){
  gulp.src('./src/fonts/**/*')
      .pipe(gulp.dest('./dist/fonts'));
      
});

gulp.task('copy-jasmine', function(){
  gulp.src('./src/jasmine/**/*')
      .pipe(gulp.dest('./dist/jasmine'));
      
});