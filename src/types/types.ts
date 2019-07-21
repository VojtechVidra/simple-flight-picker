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

export interface DayList {
  date: string;
  status: string;
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
  dayList: DayList[];
}

export interface Prices {
  calendarPriceList: CalendarPriceList;
}
