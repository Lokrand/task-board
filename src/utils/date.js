export const getDate = (date) => {
  const moment = require('moment');
  // require('moment/locale/en');
  const time = new Date(Date.parse(date))
  const timer = new Intl.DateTimeFormat("en", {timeZoneName: "short"}).format(time)
  const day = moment(date).calendar()
  return `${day} i-${timer.slice(timer.indexOf(',') + 2)}`
}