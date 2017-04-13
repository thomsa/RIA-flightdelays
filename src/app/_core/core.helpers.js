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
