'use strict';
const gulp = require('gulp');

const open = require('gulp-open');
// The protractor task
const protractor = require('gulp-protractor').protractor;

// Start a standalone server
const webdriverStandalone = require('gulp-protractor').webdriver_standalone;

// Download and update the selenium driver
const webdriverUpdate = require('gulp-protractor').webdriver_update_specific;

// Downloads the selenium webdriver - stupid solution to pass extra args like ignore_ssl
gulp.task('webdriver_update', webdriverUpdate({
  browsers: ['ignore_ssl']
}));

// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
gulp.task('webdriver_standalone', webdriverStandalone);

gulp.task('protractor-open-report', protractorOpenReport);

// Setting up the test task
gulp.task('protractor', () => {
  return gulp.src(['./e2e/**.js']).pipe(protractor({
    configFile: './e2e/config/conf.js',
    args: [
      '--suite', 'regression'
    ]
  }));
});

function protractorOpenReport() {
  return gulp.src(['./e2e/**/report.html'])
  .pipe(open());
}
