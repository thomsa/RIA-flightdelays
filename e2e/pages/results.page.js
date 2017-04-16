module.exports = function () {
  const airportCodesTextSelector = 'results-airport-codes';
  const howDoWeKnowButtonSelector = 'how-do-we-know-button';
  const letMeSearchButtonSelector = 'let-me-search-button';
  const errorMessageSelector = 'results-error-text';

  this.getAirportCodesText = function () {
    return element(by.id(airportCodesTextSelector)).getText();
  };

  this.isErrorMessageShown = function () {
    return element(by.id(errorMessageSelector)).isPresent();
  };

  this.clickHowDoWeKnowButton = function () {
    element(by.id(howDoWeKnowButtonSelector)).click();
  };

  this.clickLetMeSearchButton = function () {
    element(by.id(letMeSearchButtonSelector)).click();
  };

  this.drillDownClickOnBar = function (day = Number) {
    browser.actions().click(element(by.xpath(`//*[name()='svg'][1]//*[contains(@class, 'highcharts-series-group')]//*[name()='g'][2]//*[name()='rect'][${day}]`))
    .getWebElement()).perform();
  };
};
