'use strict';
// Create globals so leaflet can load
global.window = { screen: {} };
global.document = {
	documentElement: { style: {} },
	getElementsByTagName: () => {
		return [];
	},
	createElement: () => {
		return {};
	}
};
global.navigator = { userAgent: 'nodejs', platform: 'nodejs' };
// LOCAD PLUGINS / DEPENDENCIES;
const gulp = require('gulp'); //STREAMING BUILD SYSTEM
const sass = require('gulp-sass');
const browsersync = require('browser-sync').create();
const del = require('del');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackconfig = require('./webpack.config.js');
const webpackstream = require('webpack-stream');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

/* ––––– TOP LEVEL FUNCTIONS –––––
	gulp.task: DEFINES TASKS,
	gulp.src: SOURCE FILES,
	gulp.dest: DESTINATION DIRECTORY,
	gulp.watch: MONITOR FOR CHANGES;
*/

('use strict');

// BrowserSync Initiation
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: './'
		},
		port: 8080
	});
	done();
}
// BrowserSync Refresh (on update)
function browserSyncReload(done) {
	browsersync.reload();
	done();
}
// Clean Old Assets - Remove previously compiled files before re-compiling
function clean() {
	return del([ './static/' ]);
}
// SASS to CSS task
function css() {
	return gulp
		.src('./src/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass({ outputStyle: 'expanded' })) // converts into static css;
		.pipe(gulp.dest('./static/css/'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(postcss([ cssnano() ]))
		.pipe(gulp.dest('./static/css/'))
		.pipe(browsersync.stream());
}

// Transpile, concatenate and minify JS scripts
function scripts() {
	return (
		gulp
			.src([ './src/js/**/*.js' ])
			.pipe(plumber())
			.pipe(webpackstream(webpackconfig, webpack))
			.pipe(gulp.dest('./static/js/'))
			.pipe(browsersync.stream())
	);
}

// Watch (& Reload) if changes made to files
function watchFiles() {
	gulp.watch('./src/scss/**/*.scss', css);
	gulp.watch('./src/js/**/*.js', gulp.series(scripts));
	gulp.watch('./index.html', browserSyncReload);
}
// define complex tasks
/
const js = gulp.series(scripts);
const build = gulp.series(clean, gulp.parallel(css, js));
const watch = gulp.series(clean, css, js, gulp.parallel(watchFiles, browserSync));


// export tasks
exports.css = css;
exports.js = js;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = build;