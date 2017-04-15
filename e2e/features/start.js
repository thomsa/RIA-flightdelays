﻿const StartPage = require('../pages/start.page');
const startPage = new StartPage();

describe('start page', () => {
  beforeEach(() => {
    browser.get('/');
    browser.sleep(2000);
  });

  describe('when i open the app', () => {
    it('it should show the front page', () => {
      expect(startPage.getTitle()).toContain('Tired of flight delays?');
    });
  });

  describe('when i click on get started', () => {
    it('it should redirect to flight search page', () => {
      startPage.clickOnStartButton();
      browser.getCurrentUrl().then(url => {
        expect(url).toContain('select-airports');
      });
    });
  });
});
