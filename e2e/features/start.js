const StartPage = require('../pages/start.page');

describe('regression test', () => {
  const startPage = new StartPage();
  beforeEach(() => {
    browser.get('/');
  });

  describe('when i open the app', () => {
    it('it should show the front page', () => {
      expect(startPage.getTitle()).toContain('Tired of flight delays?');
    });
  });
});
