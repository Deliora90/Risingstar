const month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
function formateDate(date) {
  return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}
function getDate(date) {
  return date ? formateDate(date) : "";
}
function getUniqList(data, field) {
  const allListResult = [];
  const dict = {};
  if (data && data.length > 0) {
    data.forEach((element) => {
      if (element && element[field] && !(element[field] in dict)) {
        dict[element[field]] = element[field];
        allListResult.push(element);
      }
    });
  }
  return allListResult;
}
function getValue(data) {
  return (typeof data === "undefined" || data === null) ? "" : data;
}
export {
  getDate,
  getUniqList,
  getValue,
};
