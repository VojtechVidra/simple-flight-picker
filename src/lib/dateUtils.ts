import { Moment } from "moment";

export const getMonthAndYear = (date: Moment): string => date.format("MM/YYYY");

export const getDayOfMonth = (date: Moment): string => date.format("DD");

export const getTime = (date: Moment): string => date.format("HH:mm");
