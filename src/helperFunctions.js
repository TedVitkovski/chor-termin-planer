
/**
 * This helper function turn a month into a string
 * @func
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
 
  const days = individualDates.map(date => 
    date.slice(0, 2)
  ).sort();

  const sortedArr = individualDates.map((date, index) => {
    const tempRest = date.slice(2, 8);
    return days[index] + tempRest;
  });

  return sortedArr;
}

/**
 * This helper function takes in the name and
 * return it with the first letter capitalized
 * @func
 */
export const capitalizeName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
}


/**
 * This helper function is used, if one needs to stop
 * the compiler for a certain amount of time
 * @func
 */
export const wait = (ms) => {
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
  }
}

/**
 * This helper function is used, if one needs to check,
 * whether the passed object is empty
 * @func
 */
export const isEmpty = (obj) => {
  for (var p in obj) {
    return false;
  }
  return true;
}

/**
 * This helper function is used to check,
 * whether an element is in the given array
 * or not.
 * @func
 */
export const isInArray = (arr, element) => {
  return arr.indexOf(element) > -1;
}
