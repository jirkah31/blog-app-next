interface DateT {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
}

const getFullDateFromISO = (dateISO: string): DateT => {
  const date: Date = new Date(dateISO);
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();

  return { day, month, year, hour, minute };
};

export default getFullDateFromISO;
