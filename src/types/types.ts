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
  price: string;
}

export interface DayListOutOfDate {
  date: string;
  status: "OUT_OF_DATE";
  price: string;
  seats: string;
  duration: string;
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

export interface CalendarPriceList {
  sid: string;
  sectorId: number;
  depIata: string;
  arrIata: string;
  month: string;
  saleLocation: string;
  currency: string;
  dayList: Array<DayListAvailible | DayListOutOfDate>;
}

export interface ConvertedCalendarPriceList extends CalendarPriceList {
  dayList: never;
  flights: string[];
}

export interface Prices {
  calendarPriceList: CalendarPriceList;
}
