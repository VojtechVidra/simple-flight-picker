import { CalendarPriceList } from "../types/types";
import { convertFlights, ConvertedFlights } from "./flightsNormalizer";

jest.mock("uuid/v4");

import uuidv4 from "uuid/v4";

const uuid = jest.requireActual("uuid/v4");

describe("flights converter", () => {
  it("converts data correctly", () => {
    const dayListIds: [string, string] = [uuid(), uuid()];
    const flightIds: [string, string] = [uuid(), uuid()];
    uuidv4
      .mockReturnValueOnce(dayListIds[0])
      .mockReturnValueOnce(flightIds[0])
      .mockReturnValueOnce(dayListIds[1])
      .mockReturnValueOnce(flightIds[1]);

    const initialData: CalendarPriceList = {
      sid: "05001c1a347f9d789a16dd68f945126593d42,",
      sectorId: 0,
      depIata: "PRG",
      arrIata: "AMS",
      month: "07/2019",
      saleLocation: "CZ",
      currency: "CZK",
      dayList: [
        {
          date: "2019-07-01",
          status: "OUT_OF_DATE",
          price: "",
          seats: "",
          duration: "",
          flightsCount: ""
        },
        {
          date: "2019-07-21",
          status: "AVAILABLE",
          price: "4020",
          seats: "3",
          rbd: "A",
          duration: "0130",
          flightsCount: 1,
          flights: [
            {
              flightNumber: "0618",
              seats: "3",
              rbd: "A",
              depIata: "PRG",
              arrIata: "AMS",
              departureDateTime: "2019-07-21 17:30:00",
              arrivalDateTime: "2019-07-21 19:00:00",
              duration: "0130",
              mileage: "0",
              aircraftRef: "738"
            }
          ]
        },
        {
          date: "2019-07-22",
          status: "AVAILABLE",
          price: "1886",
          seats: "1",
          rbd: "S",
          duration: "0135",
          flightsCount: 1,
          flights: [
            {
              flightNumber: "0616",
              seats: "1",
              rbd: "S",
              depIata: "PRG",
              arrIata: "AMS",
              departureDateTime: "2019-07-22 07:00:00",
              arrivalDateTime: "2019-07-22 08:35:00",
              duration: "0135",
              mileage: "0",
              aircraftRef: "738"
            }
          ]
        }
      ]
    };
    const finalData: ConvertedFlights = {
      result: "PRG-AMS-07/2019",
      entities: {
        daylists: {
          [dayListIds[0]]: {
            date: "2019-07-21",
            status: "AVAILABLE",
            price: "4020",
            seats: "3",
            rbd: "A",
            duration: "0130",
            flightsCount: 1,
            flights: [flightIds[0]],
            id: dayListIds[0]
          },
          [dayListIds[1]]: {
            date: "2019-07-22",
            status: "AVAILABLE",
            price: "1886",
            seats: "1",
            rbd: "S",
            duration: "0135",
            flightsCount: 1,
            flights: [flightIds[1]],
            id: dayListIds[1]
          }
        },
        flights: {
          [flightIds[0]]: {
            flightNumber: "0618",
            seats: "3",
            rbd: "A",
            depIata: "PRG",
            arrIata: "AMS",
            departureDateTime: "2019-07-21 17:30:00",
            arrivalDateTime: "2019-07-21 19:00:00",
            duration: "0130",
            mileage: "0",
            aircraftRef: "738",
            id: flightIds[0]
          },
          [flightIds[1]]: {
            flightNumber: "0616",
            seats: "1",
            rbd: "S",
            depIata: "PRG",
            arrIata: "AMS",
            departureDateTime: "2019-07-22 07:00:00",
            arrivalDateTime: "2019-07-22 08:35:00",
            duration: "0135",
            mileage: "0",
            aircraftRef: "738",
            id: flightIds[1]
          }
        },
        calendarPriceList: {
          "PRG-AMS-07/2019": {
            sectorId: 0,
            depIata: "PRG",
            arrIata: "AMS",
            month: "07/2019",
            saleLocation: "CZ",
            currency: "CZK",
            dayList: dayListIds,
            sid: "05001c1a347f9d789a16dd68f945126593d42,"
          }
        }
      }
    };

    expect(convertFlights(initialData)).toEqual(finalData);
    expect(uuidv4).toBeCalledTimes(4);
  });
});
