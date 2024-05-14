import dayjs from "dayjs";

dayjs.locale("th-TH");

export const parseDateTime = (date: string) => {
  return dayjs(date).format("DD MMMM YYYY HH:mm");
};

export const parseDate = (date: string) => {
  return dayjs(date).format("DD MMMM YYYY");
};

export const parseShourtDate = (date: string) => {
  return dayjs(date).format("DD MM YY");
};

export const parseTime = (date: string) => {
  return dayjs(date).format("hh:mm A");
};
