export interface Airport {
  DestinationID: number;
  AirportCode: string;
  AirportCityName: string;
  AirportName: string;
  AirportCountryCode: string;
  LanguageCode: string;
  OfferCount: number;
}

export interface Flight {
  flightNumber: string;
  seats: string;
  rbd: string;
  depIata: string;
  arrIata: string;
  departureDateTime: string;
  arrivalDateTime: string;
  duration: string;
  mileage: string;
  aircraftRef: string;
}

export interface FlightWithId extends Flight {
  id: string;
}

export interface DayListUnavailible {
  date: string;
  status: "OUT_OF_DATE" | "SOLD_OUT";
  price: string;
  seats: string;
  duration: string;
  rbd?: "";
  flightsCount: "";
}

export interface DayListAvailible {
  date: string;
  status: "AVAILABLE";
  price: string;
  seats: string;
  rbd: string;
  duration: string;
  flightsCount: number;
  flights: Flight[];
}

export interface DayListConverted extends Omit<DayListAvailible, "flights"> {
  id: string;
  flights: string[];
}

export interface DayListFromStore extends Omit<DayListAvailible, "flights"> {
  flights: FlightWithId[];
}

export interface CalendarPriceList {
  sid: string;
  sectorId: number;
  depIata: string;
  arrIata: string;
  month: string;
  saleLocation: string;
  currency: string;
  dayList: Array<DayListAvailible | DayListUnavailible>;
}

export interface ConvertedCalendarPriceList extends Omit<CalendarPriceList, "dayList"> {
  dayList: string[];
}

export interface Prices {
  calendarPriceList: CalendarPriceList;
}
