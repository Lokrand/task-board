export const getDate = (date: string) => {
  const moment = require("moment");
  const time = new Date(Date.parse(date));
  const timer = new Intl.DateTimeFormat("en", { timeZoneName: "short" }).format(
    time
  );
  const day = moment(date).calendar();
  return `${day} i-${timer.slice(timer.indexOf(",") + 2)}`;
};
