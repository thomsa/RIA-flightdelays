module.exports = function () {
  this.urlChanged = function (url) {
    return function () {
      return browser.getCurrentUrl().then(actualUrl => {
        return url !== actualUrl;
      });
    };
  };
};
