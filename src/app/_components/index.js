/**
 * COMPONENTS MODULE
 * responsible for gathering and exposing all components under _components folder
 *
 */

import plane from './plane/plane.component';
import airportSearch from './airport-search-input/airport-search-input.component';
import delayRatioChart from './delay-ratio-chart/delay-ratio-chart.component';
import drillDownChart from './drill-down-chart/drill-down-chart.component';
import calendar from './calendar/calendar.component';
import flipClock from './flip-clock/flip-clock.component';

export default angular
  .module('ria.components', [
    airportSearch,
    drillDownChart,
    plane,
    calendar,
    flipClock,
    delayRatioChart
  ]).name;

