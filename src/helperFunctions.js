
/**
 * This helper function turn a month into a string
 */
export const monthToString = (month) => {
  const monthNames = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember',
  ];
  return monthNames[month];
};

/**
 * This helper function can be used, if one needs to stop
 * the compiler for a certain amount of time
 */
export const wait = (ms) => {
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
  }
}
