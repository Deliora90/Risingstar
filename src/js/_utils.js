const month = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
function formateDate(date) {
  return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}
function getDate(date) {
  return date ? formateDate(date) : "";
}
export {
  getDate,
};
