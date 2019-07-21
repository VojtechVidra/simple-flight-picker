import { Flight } from "../../types/types";

export interface FlightState {
  loading: boolean;
  flights: {
    byId: { [id: string]: Flight };
    allIds: string[];
  };
}
