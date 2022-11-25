const addDateSuffix = (date) => {
  let dateStr = data.toString();

  //const last char
  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === "1" && dateStr !== "11") {
    dateStr = `${dateStr}st`;
  } else if (lastChar === "2" && dateStr !== "12") {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === "3" && dateStr !== "13") {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  return dateStr;
};

// a timestamp format

module.exports = (
  timestamp,
  { monthLength = "short", dateSuffix = true } = {}
) => {
  //months objects
  const months = {
0:monthLength === "short" ? "Jan" : "January",
1:monthLength === "short" ? "Feb" : "February",
2:monthLength === "short" ? "Mar" : "March",
3:monthLength === "short" ? "Apr" : "April",
4:monthLength === "short" ? "May" : "May",
5:monthLength === "short" ? "Jun" : "June",
6:monthLength === "short" ? "Jul" : "July",
7:monthLength === "short" ? "Aug" : "August",
8:monthLength === "short" ? "Sep" : "September",
9:monthLength === "short" ? "Oct" : "October",
10:monthLength === "short" ? "Nov" : "November",
11:monthLength === "short" ? "Dec" : "December",

  };
  
};
