import { CalendarPriceList, FlightWithId, ConvertedCalendarPriceList } from "../types/types";
import { isDayListAvailible } from "../types/typeUtils";
import { normalize, schema } from "normalizr";
import uuidv4 from "uuid/v4";

interface ConvertedFlights {
  result: string;
  entities: {
    flights: {
      [id: string]: FlightWithId;
    };
    calendarPriceList: {
      [id: string]: ConvertedCalendarPriceList;
    };
  };
}

const flight = new schema.Entity("flights");
const calendarPriceList = new schema.Entity(
  "calendarPriceList",
  {
    flights: [flight]
  },
  { idAttribute: "sid" }
);

export const convertFlights = ({ dayList, ...data }: CalendarPriceList): ConvertedFlights => {
  let convertedFlights = {
    ...data,
    flights: dayList
      .filter(isDayListAvailible)
      .map(({ price, flights }) => flights.map(flight => ({ ...flight, price, id: uuidv4() })))
      // @ts-ignore
      .flat()
  };

  return normalize(convertedFlights, calendarPriceList);
};
