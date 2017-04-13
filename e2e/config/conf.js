const HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

const reporter = new HtmlScreenshotReporter({
  dest: 'e2e/screenshots',
  filename: 'report.html',
  captureOnlyFailedSpecs: true,
  reportOnlyFailedSpecs: false,
  showSummary: true,
  showQuickLinks: true,
  pathBuilder(currentSpec) {
    return currentSpec.fullName;
  }
});
// An example configuration file.
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
    // main page of application under tests
  baseUrl: 'http://localhost:3000/',

  params: {
  },

  rootElement: 'html',

    // Capabilities to be passed to the webdriver instance.
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 2,
    chromeOptions: {
            // Get rid of --ignore-certificate yellow warning
      args: ['--no-sandbox']
    },
    loggingPrefs: {
      browser: 'ALL' // "OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL".
    }
  },

  getPageTimeout: 20000,
  allScriptsTimeout: 45000,

    // Spec patterns are relative to the current working directly when
    // protractor is called.
  suites: {
    regression: [
      '../features/start.js'
    ]
  },

  framework: 'jasmine2',
    // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 90000
  },

    // Setup the report before any tests start
  beforeLaunch() {
    return new Promise(resolve => {
      reporter.beforeLaunch(resolve);
    });
  },

  onPrepare() {
    browser.driver.manage().window().maximize();
    browser.driver.manage().timeouts().implicitlyWait(5000);
    const jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.TeamCityReporter());
    jasmine.getEnv().addReporter(reporter);

    const browserLogs = require('protractor-browser-logs');
    const logs = browserLogs(browser);

    if (global.logs) {
      throw new Error('Oops, name is already reserved!');
    }
    global.logs = logs;

    beforeEach(() => {
      logs.reset();

            // not a bug:
      logs.ignore('livereload.js?snipver');
      logs.ignore('Error during WebSocket handshake: net::ERR_CONNECTION_RESET');
      logs.ignore('Cannot read property \'tweensContainer\'');

            // TODO: try remove after upgrading velocityJS to 1.3.0 or higher as fixing commit: https://github.com/julianshapiro/velocity/commit/59766ffe29c23f3902a864e2b7ef6de7598fee76 is not in any release version yet
            // note that we are using velocityJS through materialize
      logs.ignore('tweensContainer');

      logs.ignore(logs.or(logs.WARNING, logs.INFO, logs.DEBUG));
    });

    afterEach(() => {
      return logs.verify();
    });
  },

    // Close the report after all tests finish
  afterLaunch(exitCode) {
    return new Promise(function (resolve) {
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
};
