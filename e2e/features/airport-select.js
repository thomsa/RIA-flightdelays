const AirportsPage = require('../pages/airport-select.page');
const airportsPage = new AirportsPage();

describe('airport select page', () => {
  beforeEach(() => {
    browser.get('/select-airports');
  });

  describe('when i open the airports page', () => {
    it('it should show the right template', () => {
      expect(airportsPage.getHeadLineText()).toContain('Let us know where you are travelling to!');
    });
    it('origin airport input should be enabled', () => {
      expect(airportsPage.originInputIsEnabled()).toBe(true);
    });
    it('destination input airport should be disabled', () => {
      expect(airportsPage.destInputIsEnabled()).toBe(false);
    });
  });
// ************* ORIGIN INPUT **********
  describe('origin input', () => {
    describe('when i click on origin airport', () => {
      it('it should show the the airports in the autocomplete', () => {
        airportsPage.clickOnOriginInput();
        expect(airportsPage.getNumberOfResultsInOriginInput()).toBe(8);
      });
    });

    describe('when I search origin', () => {
      it('it should show the filtered airports in the autocomplete', () => {
        airportsPage.typeToOriginInput('Albuque');
        expect(airportsPage.getNumberOfResultsInOriginInput()).toBe(1);
      });
    });
    describe('when I search and select an origin airport', () => {
      it('it should make the destination enabled', () => {
        airportsPage.searchAndSelectFirstOrigin('Albuque');
        expect(airportsPage.destInputIsEnabled()).toBe(true);
      });

      it('it should set the selected item in the input', () => {
        airportsPage.searchAndSelectFirstOrigin('Albuque');
        expect(airportsPage.getOriginInputValue()).toBe('Albuquerque International, United States, ABQ');
      });
    });
  });
// ************* DESTINATION INPUT **********
  describe('destination input', () => {
    beforeEach(() => {
      airportsPage.searchAndSelectFirstOrigin('Albuque');
    });

    describe('when i click on destination airport', () => {
      it('it should show the the airports in the autocomplete', () => {
        airportsPage.clickOnDestInput();
        expect(airportsPage.getNumberOfResultsInDestinationInput()).toBe(4);
      });
    });

    describe('when I search destination', () => {
      it('it should show the filtered airports in the autocomplete', () => {
        airportsPage.typeToDestInput('Los Angeles');
        expect(airportsPage.getNumberOfResultsInOriginInput()).toBe(1);
      });
    });

    describe('when I search and select a destination airport', () => {
      it('it should make the SHOW ME! button enabled', () => {
        airportsPage.searchAndSelectFirstDest('Los Angeles');
        expect(airportsPage.showMeButtonIsEnabled()).toBe(true);
      });

      it('it should set the selected item in the input', () => {
        airportsPage.searchAndSelectFirstDest('Los Angeles');
        expect(airportsPage.getDestInputValue()).toBe('Los Angeles International, United States, LAX');
      });
    });
  });

  describe('when i search and click SHOW ME button', () => {
    it('it should redirect to results page', () => {
      airportsPage.searchAndSeeResults('Albuque', 'Los Angeles');
      browser.getCurrentUrl().then(url => {
        expect(url).toContain('/results/ABQ/LAX');
      });
    });
  });
});
