/**
 *
 * @param {date from which to return formated string} date
 * @returns string in format YYYY-MM-DD without timezone affection
 */
export const getDateYYYYMMDD = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .substring(0, 10);
};
/**
 *
 * @param {string - date from which to return formated string} date
 * @returns string in format YYYY-MM-DD HH:MM:SS without timezone affection
 */
export const getDateYYYYMMDDHHMMSS = (dateString) => {
  let date = new Date(dateString);
  let stringDate = getDateYYYYMMDD(date);
  return stringDate + " " + date.getHours() + ":" + date.getMinutes();
};
/**
 *
 * @param {string - date from which to return formated string} date
 * @returns string in format HH:MM without timezone affection
 */
export const getDateHHMMSS = (dateString) => {
  let date = new Date(dateString);
  return (
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2)
  );
};

export const calculateDateDifference = (a, b) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};
