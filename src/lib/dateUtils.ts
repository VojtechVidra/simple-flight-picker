import { Moment } from "moment";

export const getMonthAndYear = (date: Moment): string => date.format("MM/YYYY");

export const getDayAndMonth = (date: Moment): string => date.format("DD.MM");

export const getTime = (date: Moment): string => date.format("HH:mm");
