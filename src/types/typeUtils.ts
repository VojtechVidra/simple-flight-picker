import { DayListAvailible, DayListOutOfDate } from "./types";

export const isDayListAvailible = (daylist: DayListAvailible | DayListOutOfDate): daylist is DayListAvailible =>
  daylist.status === "AVAILABLE";
