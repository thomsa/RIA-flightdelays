const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.series(gulp.parallel('inject-scss', 'other', 'webpack:dist')));
gulp.task('test', gulp.series('karma:single-run', 'karma:open-report'));
gulp.task('test:auto', gulp.series('karma:auto-run'));
gulp.task('test:debug', gulp.series('karma:debug'));
gulp.task('serve', gulp.series('inject-scss', 'webpack:watch', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

gulp.task('webdriver-start', gulp.series('webdriver_update', 'webdriver_standalone'));
gulp.task('test:e2e', gulp.series('protractor', 'protractor-open-report'));
gulp.task('test:e2e-prod', gulp.series('protractor-prod', 'protractor-open-report'));

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function watch(done) {
  gulp.watch(conf.path.tmp('index.html'), reloadBrowserSync);
  done();
}
