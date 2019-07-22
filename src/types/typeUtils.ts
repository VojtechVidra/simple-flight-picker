import { DayListAvailible, DayListUnavailible } from "./types";

export const isDayListAvailible = (daylist: DayListAvailible | DayListUnavailible): daylist is DayListAvailible =>
  daylist.status === "AVAILABLE";
