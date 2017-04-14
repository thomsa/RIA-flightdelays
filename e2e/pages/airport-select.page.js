module.exports = function () {
  const originInputSelector = '//*[@id="origin"]//input';
  const destInputSelector = '//*[@id="destination"]//input';
  const originFirstItemSelector = '//*[@id="ul-0"]/li';
  const destFirstItemSelector = '//*[@id="ul-1"]/li';
  const showMeButtonSelector = 'show-me-button';

  this.getHeadLineText = function () {
    browser.waitForAngular();
    return element(by.id('headline')).getText();
  };
  //* *******CLICK **********/
  this.clickOnOriginInput = function () {
    browser.waitForAngular();
    element(by.xpath(originInputSelector)).click();
  };

  this.clickOnDestInput = function () {
    browser.waitForAngular();
    element(by.xpath(destInputSelector)).click();
  };

  this.clickOnFirstOriginResult = function () {
    browser.waitForAngular();
    element(by.xpath(originFirstItemSelector)).click();
  };
  this.clickOnFirstDestResult = function () {
    browser.waitForAngular();
    element(by.xpath(destFirstItemSelector)).click();
  };
  this.clickOnShowMeButton = function () {
    browser.waitForAngular();
    element(by.id(showMeButtonSelector)).click();
  };

  //* ******* TYPE **********/
  this.typeToOriginInput = function (str) {
    browser.waitForAngular();
    element(by.xpath(originInputSelector)).sendKeys(str);
  };

  this.typeToDestInput = function (str) {
    browser.waitForAngular();
    element(by.xpath(destInputSelector)).sendKeys(str);
    browser.waitForAngular();
  };
  //* ******* ATTRIBUTE SELECTORS **********/
  this.getOriginInputValue = function () {
    return element(by.xpath(originInputSelector)).getAttribute('value');
  };

  this.getDestInputValue = function () {
    return element(by.xpath(destInputSelector)).getAttribute('value');
  };

  this.originInputIsEnabled = function () {
    return element(by.xpath(originInputSelector)).isEnabled();
  };

  this.destInputIsEnabled = function () {
    return element(by.xpath(destInputSelector)).isEnabled();
  };

  this.showMeButtonIsEnabled = function () {
    return element(by.id(showMeButtonSelector)).isEnabled();
  };

  this.getNumberOfResultsInOriginInput = function () {
    return element.all(by.xpath(originFirstItemSelector)).count();
  };

  this.getNumberOfResultsInDestinationInput = function () {
    return element.all(by.xpath(destFirstItemSelector)).count();
  };

  //* ******* OTHERS **********/
  this.searchAndSelectFirstOrigin = function (search) {
    this.typeToOriginInput(search);
    this.clickOnFirstOriginResult();
  };

  this.searchAndSelectFirstDest = function (search) {
    this.typeToDestInput(search);
    this.clickOnFirstDestResult();
  };

  this.searchAndSeeResults = function (origin, destination) {
    this.searchAndSelectFirstOrigin(origin);
    this.searchAndSelectFirstDest(destination);
    this.clickOnShowMeButton();
  };
};
