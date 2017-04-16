const ResultsPage = require('../pages/results.page');
const resultsPage = new ResultsPage();

describe('results page', () => {
  describe('calendar like result', () => {
    beforeEach(() => {
      browser.get('/results/ABQ/LAX');
    });

    describe('when i open the results page', () => {
      it('it should fetch and show the right airports', () => {
        expect(resultsPage.getAirportCodesText()).toContain('ABQ - LAX');
        expect(resultsPage.isErrorMessageShown()).toBeFalsy();
      });
    });

    describe('when i open the results page with unknown airport codes', () => {
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

  describe('chart like result', () => {
    beforeEach(() => {
      browser.get('/results-chart/ABQ/LAX');
    });

    describe('when i open the results page', () => {
      it('it should fetch and show the right airports', () => {
        expect(resultsPage.getAirportCodesText()).toContain('ABQ - LAX');
        expect(resultsPage.isErrorMessageShown()).toBeFalsy();
      });
    });

    describe('when i open the results page with unknown airport codes', () => {
      it('it should show "sorry" message', () => {
        browser.get('/results/bar/foo');
        expect(resultsPage.isErrorMessageShown()).toBeTruthy();
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

    describe('drill down chart', () => {
      describe('when i click on a bar ', () => {
        xit('it should show the results for the certain day', () => {
          resultsPage.drillDownClickOnBar(14);
          browser.sleep(5000);
        }).pend('Selenium can not click on the charts. Further investigation needed.');
      });
    });
  });
});
