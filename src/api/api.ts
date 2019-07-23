import fetch from "isomorphic-unfetch";
import { Airport, Prices } from "../types/types";

const generateQueryString = (params: object): string => "?" + new URLSearchParams(params as any);

const get = (url: string, init?: RequestInit) =>
  fetch(url, {
    method: "get",
    ...init
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      return res;
    })
    .then(res => res.json())
    .catch((err: Error) => console.warn(err.message));

export const getAllDestinationsApiCall = (language: string = "en"): Promise<Airport[]> =>
  get(
    `https://www.csa.cz/Umbraco/Api/DestinationCache/GetAllDestinations${generateQueryString({
      destinations_language: language
    })}`
  );

export const getPricesApiCall = (
  data: {
    departure: string;
    arrival: string;
    month: string;
    sectorId: string;
    langugage: string;
    idLocation: string;
  },
  init?: RequestInit
): Promise<Prices> =>
  get(
    `https://www.csa.cz/Umbraco/Api/CalendarPricesCache/GetPrices${generateQueryString({
      DEP: data.departure,
      ARR: data.arrival,
      MONTH_SEL: data.month,
      SECTOR_ID: data.sectorId,
      LANG: data.langugage,
      ID_LOCATION: data.idLocation
    })}`,
    init
  );
