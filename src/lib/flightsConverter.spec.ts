import { CalendarPriceList } from "../types/types";
import { convertFlights } from "../lib/flightsConverter";

jest.mock("uuid/v4");

import uuidv4 from "uuid/v4";

const uuid = jest.requireActual("uuid/v4");

describe("flights converter", () => {
  it("converts data correctly", () => {
    const ids = [uuid(), uuid()];
    uuidv4.mockReturnValueOnce(ids[0]).mockReturnValueOnce(ids[1]);

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
    const finalData = {
      result: "05001c1a347f9d789a16dd68f945126593d42,",
      entities: {
        flights: {
          [ids[0]]: {
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
            price: "4020",
            id: ids[0]
          },
          [ids[1]]: {
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
            price: "1886",
            id: ids[1]
          }
        },
        calendarPriceList: {
          "05001c1a347f9d789a16dd68f945126593d42,": {
            sectorId: 0,
            depIata: "PRG",
            arrIata: "AMS",
            month: "07/2019",
            saleLocation: "CZ",
            currency: "CZK",
            flights: ids,
            sid: "05001c1a347f9d789a16dd68f945126593d42,"
          }
        }
      }
    };

    expect(convertFlights(initialData)).toEqual(finalData);
    expect(uuidv4).toBeCalledTimes(2);
  });
});
