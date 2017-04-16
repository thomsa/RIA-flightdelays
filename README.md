# RIA-flightdelays

master [![Build Status](https://travis-ci.org/thomsa/RIA-flightdelays.svg?branch=master)](https://travis-ci.org/thomsa/RIA-flightdelays/branches) | develop [![Build Status](https://travis-ci.org/thomsa/RIA-flightdelays.svg?branch=develop)](https://travis-ci.org/thomsa/RIA-flightdelays/branches)

```
gulp or gulp build  // build dist folder
gulp serve          // start local development server
gulp serve:dist     // start local production server
gulp test --continue          // run karma tests
gulp test:auto     // run karma tests from browser
gulp test:debug    // run karma in chrome with debug options
```
### RUN AUTOMATIC E2E TESTS

Run the application from dist:
```
gulp serve:dist
```
Open one command prompt and run:
```
gulp webdriver-start
```
Open another command prompt and run:
```
gulp test:e2e --continue
```