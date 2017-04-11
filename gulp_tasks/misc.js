const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const conf = require('../conf/gulp.conf');

const gulpNgConfig = require('gulp-ng-config');

gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('ng-config-dev', ngConfigDev);

function ngConfigDev() {
  return gulp.src(conf.paths.ngConfig.jsonDev)
  .pipe(gulpNgConfig('riaApp.config'))
  .pipe(gulp.dest(conf.paths.ngConfig.dest));
}

function clean() {
  return del([conf.paths.dist + '/**/*', conf.paths.dist + '.git', conf.paths.tmp]);
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,js,html}')
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(conf.paths.dist));
}
