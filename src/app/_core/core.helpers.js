import * as globals from './core.globals';

export function getReadableTimeFromInt(number) {
  if (number) {
    const str = number.toString();
    if (str.length === 4) {
      return [str.slice(0, 2), ':', str.slice(2)].join('');
    } else if (str.length === 3) {
      return ['0', str.slice(0, 1), ':', str.slice(1)].join('');
    }
  }
  return null;
}

export function groupFlightDetailsToDate(flightData) {
  if (flightData) {
    return flightData.reduce((obj, item) => {
      obj[item.FL_DATE] = obj[item.FL_DATE] || [];
      obj[item.FL_DATE].push(item);
      return obj;
    }, {});
  }
  return null;
}

export function getNextPossibleDayInMonthFromDay(dayOfMonthToSearchFor) {
  const day = parseInt(dayOfMonthToSearchFor, 10);
  const Calendar = new Date();
  const currentYear = Calendar.getFullYear();     // Returns year
  const currentMonth = Calendar.getMonth();    // Returns month (0-11)
  const today = Calendar.getDate();    // Returns day (1-31)

  if (day >= today) {
    return {
      startingDayOfTheMonth: new Array(new Date(currentYear + '-' + (currentMonth + 1) + '-01').getDay() - 1),
      month: globals.MONTHS[currentMonth],
      daysInMonth: new Array(new Date(currentYear, (currentMonth + 1), 0).getDate())
    };
  }
  return {
    startingDayOfTheMonth: new Array(new Date(currentYear + '-' + (currentMonth + 2) + '-01').getDay() - 1),
    month: globals.MONTHS[currentMonth + 1],
    daysInMonth: new Array(new Date(currentYear, (currentMonth + 2), 0).getDate())
  };
}

export function getNextTravelInfoFromFlighDetailWithMinimumDelay(minimumDelay) {
  const nextTravel = {};
  nextTravel.day = new Date(minimumDelay.FL_DATE).getDate();
  nextTravel.time = getReadableTimeFromInt(minimumDelay.CRS_DEP_TIME);
  nextTravel.hour = nextTravel.time.slice(0, 2);
  nextTravel.minute = nextTravel.time.slice(3);

  const Calendar = new Date();
  const currentMonth = Calendar.getMonth();
  const today = Calendar.getDate();

  nextTravel.year = Calendar.getFullYear();

  if (nextTravel.day >= today) {
    nextTravel.monthText = globals.MONTHS[currentMonth];
    nextTravel.month = currentMonth;
  } else if (currentMonth < 11) {
    nextTravel.monthText = globals.MONTHS[currentMonth + 1];
    nextTravel.month = currentMonth + 1;
  } else {
    // if the current month is december set January as travel month and year as next year
    nextTravel.monthText = globals.MONTHS[0];
    nextTravel.month = 0;
    nextTravel.year++;
  }
  return nextTravel;
}
