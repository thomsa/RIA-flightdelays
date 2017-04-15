import * as globals from './core.globals';

export function getReadableTimeFromInt(number) {
  if (!number) {
    return null;
  }
  const str = number.toString();
  if (str.length === 4) {
    return [str.slice(0, 2), ':', str.slice(2)].join('');
  } else if (str.length === 3) {
    return ['0', str.slice(0, 1), ':', str.slice(1)].join('');
  }
  return null;
}

export function groupFlightDetailsToDate(flightData) {
  if (!flightData) {
    return null;
  }
  return flightData.reduce((obj, item) => {
    obj[item.FL_DATE] = obj[item.FL_DATE] || [];
    obj[item.FL_DATE].push(item);
    return obj;
  }, {});
}

export function getNextTravelInfoFromFlighDetailWithMinimumDelay(minimumDelay, calendar = Date) {
  const nextTravel = {};
  nextTravel.day = new Date(minimumDelay.FL_DATE).getDate();
  nextTravel.time = getReadableTimeFromInt(minimumDelay.CRS_DEP_TIME);
  nextTravel.hour = nextTravel.time.slice(0, 2);
  nextTravel.minute = nextTravel.time.slice(3);

  const currentMonth = calendar.getMonth();
  const today = calendar.getDate();

  nextTravel.year = calendar.getFullYear();

  if (nextTravel.day >= today && currentMonth < 11) {
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
