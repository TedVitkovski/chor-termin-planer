
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
 * This helper function sorts an array of dates in the ascending order.
 * @function
 */
export const sortIndividualDates = (individualDates) => {
  let sortedArr = [];
  let days = [];
  for (let i = 0; i < individualDates.length; i++) {
    let tempDate = individualDates[i];
    const tempDay = tempDate.slice(0, 2);
    days.push(tempDay);
  }
  days.sort();
  for (let i = 0; i < individualDates.length; i++) {
    let tempDate = individualDates[i];
    const tempRest = tempDate.slice(2, 8);
    const newDate = days[i] + tempRest;
    sortedArr.push(newDate);
  }
  return sortedArr;
}


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

/**
 * This helper function can be used, if one needs to check,
 * whether the passed object is empty
 */
export const isEmpty = (obj) => {
  for (var p in obj) {
    return false;
  }
  return true;
}

/**
 * This helper function can be used to check,
 * whether an element is in the given array
 * or not.
 */
export const isInArray = (arr, element) => {
  return arr.indexOf(element.toLowerCase()) > -1;
}
