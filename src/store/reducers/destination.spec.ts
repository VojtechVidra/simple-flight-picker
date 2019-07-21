import reducer, {
  DestinationState,
  GET_DESTINATIONS_REQUEST,
  GET_DESTINATIONS_SUCCESS,
  GET_DESTINATIONS_FAILURE
} from "./destination";
import { Airports } from "../../mocks/Airport";

describe("destination reducer", () => {
  it("should return default state", () => {
    expect(reducer(undefined, { type: "." })).toEqual({ destinations: [], loading: false });
  });
  it("should handle GET_DESTINATIONS_REQUEST", () => {
    const initialState: DestinationState = {
      loading: false,
      destinations: []
    };
    const finalState: DestinationState = {
      loading: true,
      destinations: []
    };
    expect(reducer(initialState, { type: GET_DESTINATIONS_REQUEST })).toEqual(finalState);
  });
  it("should handle GET_DESTINATIONS_SUCCESS", () => {
    const initialState: DestinationState = {
      loading: true,
      destinations: []
    };
    const finalState: DestinationState = {
      loading: false,
      destinations: Airports
    };
    expect(reducer(initialState, { type: GET_DESTINATIONS_SUCCESS, payload: Airports })).toEqual(finalState);
  });
  it("should handle GET_DESTINATIONS_FAILURE", () => {
    const initialState: DestinationState = {
      loading: true,
      destinations: []
    };
    const finalState: DestinationState = {
      loading: false,
      destinations: []
    };
    expect(reducer(initialState, { type: GET_DESTINATIONS_FAILURE, payload: new Error("err") })).toEqual(finalState);
  });
});
