import * as helpers from './core.helpers';
import * as globals from './core.globals';

describe('core helpers', () => {
  describe('getReadableTimeFromInt', () => {
    it('should get readable time from int input', () => {
      expect(helpers.getReadableTimeFromInt(730)).toBe('07:30');
      expect(helpers.getReadableTimeFromInt(1430)).toBe('14:30');
    });

    it('should return null from getReadableTimeFromInt if the number is undefined or can not be treated as time', () => {
      expect(helpers.getReadableTimeFromInt(0)).toBe(null);
      expect(helpers.getReadableTimeFromInt(-1)).toBe(null);
      expect(helpers.getReadableTimeFromInt(10)).toBe(null);
      expect(helpers.getReadableTimeFromInt(undefined)).toBe(null);
    });
  });

  describe('groupFlightDetailsToDate', () => {
    it('should group flight data by flight date', () => {
      const groupedToDate = helpers.groupFlightDetailsToDate(
        [
          {
            FL_DATE: '2017-01-01T00:00:00',
            ORIGIN: 'ABQ',
            DEST: 'LAX',
            CRS_DEP_TIME: 731,
            CRS_ARR_TIME: 842,
            ARR_DELAY: -6.0,
            CRS_ELAPSED_TIME: 131.0,
            DISTANCE: 677.0
          },
          {
            FL_DATE: '2017-01-01T00:00:00',
            ORIGIN: 'ABQ',
            DEST: 'LAX',
            CRS_DEP_TIME: 855,
            CRS_ARR_TIME: 1000,
            ARR_DELAY: -11.0,
            CRS_ELAPSED_TIME: 125.0,
            DISTANCE: 677.0
          },
          {
            FL_DATE: '2017-01-01T00:00:00',
            ORIGIN: 'ABQ',
            DEST: 'LAX',
            CRS_DEP_TIME: 1640,
            CRS_ARR_TIME: 1745,
            ARR_DELAY: 45.0,
            CRS_ELAPSED_TIME: 125.0,
            DISTANCE: 677.0
          }]
    );
      const result = {};
      result['2017-01-01T00:00:00'] = [{FL_DATE: '2017-01-01T00:00:00', ORIGIN: 'ABQ', DEST: 'LAX', CRS_DEP_TIME: 731, CRS_ARR_TIME: 842, ARR_DELAY: -6, CRS_ELAPSED_TIME: 131, DISTANCE: 677}, {FL_DATE: '2017-01-01T00:00:00', ORIGIN: 'ABQ', DEST: 'LAX', CRS_DEP_TIME: 855, CRS_ARR_TIME: 1000, ARR_DELAY: -11, CRS_ELAPSED_TIME: 125, DISTANCE: 677}, {FL_DATE: '2017-01-01T00:00:00', ORIGIN: 'ABQ', DEST: 'LAX', CRS_DEP_TIME: 1640, CRS_ARR_TIME: 1745, ARR_DELAY: 45, CRS_ELAPSED_TIME: 125, DISTANCE: 677}];

      expect(JSON.stringify(groupedToDate)).toBe(JSON.stringify(result));
    });

    it('should return null if the flight data is undefined or null', () => {
      expect(helpers.groupFlightDetailsToDate(null)).toBe(null);
      expect(helpers.groupFlightDetailsToDate(undefined)).toBe(null);
    });
  });

  describe('getNextTravelInfoFromFlighDetailWithMinimumDelay', () => {
    let Calendar;
    let currentYear;
    let currentMonth;
    let today;
    beforeEach(() => {
      Calendar = new Date();
      currentYear = Calendar.getFullYear();     // Returns year
      currentMonth = Calendar.getMonth();    // Returns month (0-11)
      today = Calendar.getDate();    // Returns day (1-31)
    });

    it('should get this month as travel date if the flight day after the current day in the actual month', () => {
      const flDate = new Date(currentYear, currentMonth, today + 1).toISOString();
      const data = helpers.getNextTravelInfoFromFlighDetailWithMinimumDelay({
        FL_DATE: flDate,
        ORIGIN: 'ABQ',
        DEST: 'LAX',
        CRS_DEP_TIME: 731,
        CRS_ARR_TIME: 842,
        ARR_DELAY: -6.0,
        CRS_ELAPSED_TIME: 131.0,
        DISTANCE: 677.0
      }, Calendar);
      const result = {
        day: today + 1,
        time: '07:31',
        hour: '07',
        minute: '31',
        year: currentYear,
        monthText: globals.MONTHS[currentMonth],
        month: currentMonth
      };
      expect(JSON.stringify(data)).toBe(JSON.stringify(result));
    });

    it('should get this month as travel date if the flight day is today', () => {
      const flDate = new Date(currentYear, currentMonth, today).toISOString();
      const data = helpers.getNextTravelInfoFromFlighDetailWithMinimumDelay({
        FL_DATE: flDate,
        ORIGIN: 'ABQ',
        DEST: 'LAX',
        CRS_DEP_TIME: 731,
        CRS_ARR_TIME: 842,
        ARR_DELAY: -6.0,
        CRS_ELAPSED_TIME: 131.0,
        DISTANCE: 677.0
      }, Calendar);
      const result = {
        day: today,
        time: '07:31',
        hour: '07',
        minute: '31',
        year: currentYear,
        monthText: globals.MONTHS[currentMonth],
        month: currentMonth
      };
      expect(JSON.stringify(data)).toBe(JSON.stringify(result));
    });

    it('should get NEXT month as travel date if the flight day is before today', () => {
      const flDate = new Date(currentYear, currentMonth, today - 1).toISOString();
      const data = helpers.getNextTravelInfoFromFlighDetailWithMinimumDelay({
        FL_DATE: flDate,
        ORIGIN: 'ABQ',
        DEST: 'LAX',
        CRS_DEP_TIME: 731,
        CRS_ARR_TIME: 842,
        ARR_DELAY: -6.0,
        CRS_ELAPSED_TIME: 131.0,
        DISTANCE: 677.0
      }, Calendar);
      const result = {
        day: today - 1,
        time: '07:31',
        hour: '07',
        minute: '31',
        year: currentYear,
        monthText: globals.MONTHS[currentMonth + 1],
        month: currentMonth + 1
      };
      expect(JSON.stringify(data)).toBe(JSON.stringify(result));
    });

    it('should get NEXT YEAR JANUARY as travel date if the flight day is before today and the current month is December', () => {
      const flDate = new Date(currentYear, currentMonth, today - 1).toISOString();
      const data = helpers.getNextTravelInfoFromFlighDetailWithMinimumDelay({
        FL_DATE: flDate,
        ORIGIN: 'ABQ',
        DEST: 'LAX',
        CRS_DEP_TIME: 731,
        CRS_ARR_TIME: 842,
        ARR_DELAY: -6.0,
        CRS_ELAPSED_TIME: 131.0,
        DISTANCE: 677.0
      }, new Date(currentYear, 11, today)); // fake december date
      const result = {
        day: today - 1,
        time: '07:31',
        hour: '07',
        minute: '31',
        year: (currentYear + 1),
        monthText: globals.MONTHS[0],
        month: 0 // January
      };
      expect(JSON.stringify(data)).toBe(JSON.stringify(result));
    });
  });
});
