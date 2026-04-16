const gulp = require('gulp');
const env = require('node-env-file');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');

// Load environment variables
try {
  env('.env');
} catch (e) {
  console.log('Note: .env file not found, using defaults');
}

const themeName = process.env.THEME_NAME || 'concrete-child';

const paths = {
  scss: `./wordpress/wp-content/themes/${themeName}/assets/scss/**/*.scss`,
  css: `./wordpress/wp-content/themes/${themeName}/assets/css/`,
};

/**
 * Compile SCSS to CSS
 */
function compileSass() {
  return gulp
    .src(paths.scss)
    .pipe(plumber({
      errorHandler: notify.onError({
        title: 'SCSS Compilation Error',
        message: '<%= error.message %>',
      }),
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({ 
      outputStyle: 'expanded',
      sourceComments: true
    }).on('error', sass.logError))
    .pipe(cleancss({ 
      debug: true,
      level: { 1: { specialComments: 0 } }
    }, function (details) {
      console.log(`✓ ${details.name}: ${details.stats.originalSize} → ${details.stats.minifiedSize} bytes`);
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions', 'ie >= 11', 'Android >= 4', 'ios_saf >= 10'],
      cascade: false,
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.css))
    .pipe(notify({
      title: 'Gulp',
      message: '✓ SCSS compiled successfully!',
      timeout: 2000,
    }));
}

/**
 * Watch SCSS files for changes
 */
function watchFiles() {
  console.log('👁️  Watching SCSS files for changes...');
  gulp.watch(paths.scss, compileSass);
}

/**
 * Default task: compile and watch
 */
exports.sass = compileSass;
exports.watch = watchFiles;
exports.default = gulp.series(compileSass, watchFiles);
