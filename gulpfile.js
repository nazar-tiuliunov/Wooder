let gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	del = require('del'),
	uglify = require('gulp-uglify-es').default;

gulp.task('scss', function () {
	return gulp.src('app/scss/style.scss')
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(autoprefixer({
			overrideBrowserlist: ["last 5 versions"],
			cascade: true
		}))
		.pipe(gulp.dest('app/css/'))
		.pipe(sass({ outputStyle: 'compressed' }))
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('app/css/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
	return gulp.src('app/**/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('script', function () {
	return gulp.src('app/js/script.js')
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('app/js/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: 'app/'
		}
	});
});

gulp.task('build', async function () {
	function clear(params) {
		return del("dist/")
	}
	let buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

	let buildCss = gulp.src('app/css/*.css')
		.pipe(gulp.dest('dist/css'));

	let buildJs = gulp.src('app/js/*.js')
		.pipe(gulp.dest('dist/js'));

	let buildImg = gulp.src('app/img/**/*.*')
		.pipe(gulp.dest('dist/img'));

	let buildFonts = gulp.src('app/fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts'));

	let readMe = gulp.src('README.md')
		.pipe(gulp.dest('dist/'))
});

gulp.task('watch', function () {
	gulp.watch('app/scss/*.scss', gulp.parallel('scss'))
	gulp.watch('app/**/*.html', gulp.parallel('html'))
	gulp.watch('app/js/script.js', gulp.parallel('script'))
	gulp.watch('app/**/*.*', gulp.parallel('build'))
});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'))