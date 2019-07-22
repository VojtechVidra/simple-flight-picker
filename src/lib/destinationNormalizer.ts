import { Airport } from "../types/types";
import { normalize, schema } from "normalizr";

export interface ConvertedDestinations {
  result: string[];
  entities: {
    destinations: {
      [id: string]: Airport;
    };
  };
}

const destination = new schema.Entity("destinations", {}, { idAttribute: "AirportCode" });
const destinations = [destination];

export const normalizeDestinations = (data: Airport[]): ConvertedDestinations => normalize(data, destinations);
