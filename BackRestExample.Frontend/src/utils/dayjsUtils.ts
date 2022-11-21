import dayjs, {Dayjs} from "dayjs";

export const string2date = (str: string): Dayjs => {
  return dayjs(str, 'DD-MM');
}

export const date2string = (date: dayjs.Dayjs | null): string => {
  if (date === null) {
    return '';
  }
  return date.format('DD.MM');
}
