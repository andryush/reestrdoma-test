export const dateConverter = (date: string): string => {
  return date.slice(0, date.indexOf("T")).split("-").reverse().join(".");
};
