module.exports = function () {
  this.clickOnStartButton = function () {
    browser.waitForAngular();
    element(by.id('get-started-button')).click();
    browser.waitForAngular();
  };

  this.getTitle = function () {
    browser.waitForAngular();
    return element(by.id('start-main-title')).getText();
  };
};
