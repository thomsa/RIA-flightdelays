const ResultsPage = require('../pages/results.page');
const resultsPage = new ResultsPage();

describe('results page', () => {
  beforeEach(() => {
    browser.get('/results/ABQ/LAX');
  });

  describe('when i open the results page', () => {
    it('it should fetch and show the right airports', () => {
      expect(resultsPage.getAirportCodesText()).toContain('ABQ - LAX');
      expect(resultsPage.isErrorMessageShown()).toBeFalsy();
    });
  });

  describe('when i open the results page with not known airport codes', () => {
    it('it should show "sorry" message', () => {
      browser.get('/results/bar/foo');
      expect(resultsPage.isErrorMessageShown()).toBeTruthy();
    });
  });

  describe('when i click HOW DO WE KNOW button', () => {
    it('it should redirect to result with chart page', () => {
      resultsPage.clickHowDoWeKnowButton();
      browser.getCurrentUrl().then(url => {
        expect(url).toContain('/results-chart/ABQ/LAX');
      });
    });
  });

  describe('when i click LET ME SEARCH AGAIN button', () => {
    it('it should redirect to airport search page', () => {
      resultsPage.clickLetMeSearchButton();
      browser.getCurrentUrl().then(url => {
        expect(url).toContain('/select-airports');
      });
    });
  });
});
