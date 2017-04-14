process.env.NODE_ENV = 'test';
const open = require('gulp-open');
const path = require('path');

const gulp = require('gulp');
const karma = require('karma');

gulp.task('karma:single-run', karmaSingleRun);
gulp.task('karma:auto-run', karmaAutoRun);
gulp.task('karma:debug', karmaDebug);
gulp.task('karma:open-report', karmaOpenReport);

function karmaOpenReport() {
  return gulp.src(['./coverage/**/index.html', '!./coverage/**/src/**'])
  .pipe(open());
}
function karmaFinishHandler(done) {
  return failCount => {
    done(failCount ? new Error(`Failed ${failCount} tests.`) : null);
  };
}

function karmaSingleRun(done) {
  const configFile = path.join(process.cwd(), 'conf', 'karma.conf.js');
  const karmaServer = new karma.Server({configFile}, karmaFinishHandler(done));
  karmaServer.start();
}

function karmaAutoRun(done) {
  const configFile = path.join(process.cwd(), 'conf', 'karma-auto.conf.js');
  const karmaServer = new karma.Server({configFile}, karmaFinishHandler(done));
  karmaServer.start();
}

function karmaDebug(done) {
  const configFile = path.join(process.cwd(), 'conf', 'karma-debug.conf.js');
  const karmaServer = new karma.Server({configFile}, karmaFinishHandler(done));
  karmaServer.start();
}
