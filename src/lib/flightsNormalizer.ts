import { CalendarPriceList, FlightWithId, ConvertedCalendarPriceList, DayListConverted } from "../types/types";
import { normalize, schema } from "normalizr";
import uuidv4 from "uuid/v4";
import { isDayListAvailible } from "../types/typeUtils";

export interface ConvertedFlights {
  result: string;
  entities: {
    daylists: { [id: string]: DayListConverted };
    flights: {
      [id: string]: FlightWithId;
    };
    calendarPriceList: {
      [id: string]: ConvertedCalendarPriceList;
    };
  };
}

export const getCalendarId = (departure: string, arrival: string, date: string): string =>
  `${departure}-${arrival}-${date}`;

const flight = new schema.Entity("flights");
const dayList = new schema.Entity("daylists", { flights: [flight] });
const calendarPriceList = new schema.Entity(
  "calendarPriceList",
  {
    dayList: [dayList]
  },
  {
    idAttribute: ({ depIata, arrIata, month }: CalendarPriceList) => getCalendarId(depIata, arrIata, month)
  }
);

export const convertFlights = ({ dayList, ...data }: CalendarPriceList): ConvertedFlights => {
  let convertedFlights = {
    ...data,
    dayList: dayList.filter(isDayListAvailible).map(({ flights, ...dayList }) => ({
      ...dayList,
      id: uuidv4(),
      flights: flights.map(f => ({ ...f, id: uuidv4() }))
    }))
  };

  return normalize(convertedFlights, calendarPriceList);
};
