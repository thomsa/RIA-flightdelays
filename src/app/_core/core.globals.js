export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const ABSTRACT_ROUTES = {
  MAIN_LAYOUT: 'MAIN'
};

export const ROUTES = {
  MAIN_LAYOUT: ABSTRACT_ROUTES.MAIN_LAYOUT,
  START_PAGE: ABSTRACT_ROUTES.MAIN_LAYOUT + '.START_PAGE',
  AIRPORT_SEARCH_PAGE: ABSTRACT_ROUTES.MAIN_LAYOUT + '.AIRPORT_SEARCH_PAGE',
  FLIGHT_RESULTS_PAGE: ABSTRACT_ROUTES.MAIN_LAYOUT + '.FLIGHT_DETAILS_PAGE',
  FLIGHT_RESULTS_CHART_PAGE: ABSTRACT_ROUTES.MAIN_LAYOUT + '.FLIGHT_DETAILS_CHART_PAGE'
};

export const API_BASE_PATH = '/data';
