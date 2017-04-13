const path = require('path');
const _ = require('lodash');
const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const conf = require('../conf/gulp.conf');
const gulpLoadPlugins = require('gulp-load-plugins');
const gulpNgConfig = require('gulp-ng-config');
const plugins = gulpLoadPlugins();

gulp.task('clean', clean);
gulp.task('other', other);
gulp.task('ng-config-dev', ngConfigDev);
gulp.task('inject-scss', injectScss);

function ngConfigDev() {
  return gulp.src(conf.paths.ngConfig.jsonDev)
  .pipe(gulpNgConfig('riaApp.config'))
  .pipe(gulp.dest(conf.paths.ngConfig.dest));
}

function injectScss() {
  return gulp.src(conf.paths.mainStyle)
    .pipe(plugins.inject(
      gulp.src(_.union(conf.paths.styles, ['!' + conf.paths.mainStyle]), {read: false})
      .pipe(plugins.sort()), {
        transform: filepath => {
          const newPath = filepath
            .replace(`src/app/`, '')
            .replace(`/src/components/`, '../components/')
            .replace('.scss', '');
          return `@import '${newPath}';`;
        }
      }))
    .pipe(gulp.dest(`src/app`));
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
