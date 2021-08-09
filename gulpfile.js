const { dest, src, watch, series } = require("gulp");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const sass = require("gulp-sass")(require("sass"));
const browsersync = require("browser-sync").create();

// Create tasks here
function compileSass() {
	return src("./static/scss/style.scss")
		.pipe(sass.sync())
		.pipe(postcss([cssnano()]))
		.pipe(dest("./dist/css"));
}

function browsersyncServe(cb) {
	browsersync.init({
		server : {
			baseDir : "./dist"
		}
	});
	cb();
}

function browsersyncReload(cb) {
	browsersync.reload();
	cb();
}

function watchTasks() {
	watch("./dist/**/*.html", browsersyncReload);
	watch("./static/**/*.scss", series(compileSass, browsersyncReload));
}
// Don't add tasks after this line

exports.default = series (
		compileSass,
		browsersyncServe,
		watchTasks
	)