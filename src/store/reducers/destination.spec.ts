import reducer, {
  DestinationState,
  GET_DESTINATIONS_REQUEST,
  GET_DESTINATIONS_SUCCESS,
  GET_DESTINATIONS_FAILURE
} from "./destination";

describe("destination reducer", () => {
  it("should return default state", () => {
    expect(reducer(undefined, { type: "." })).toEqual({ destinations: { allIds: [], byId: {} }, loading: false });
  });
  it("should handle GET_DESTINATIONS_REQUEST", () => {
    const initialState: DestinationState = {
      loading: false,
      destinations: { allIds: [], byId: {} }
    };
    const finalState: DestinationState = {
      loading: true,
      destinations: { allIds: [], byId: {} }
    };
    expect(reducer(initialState, { type: GET_DESTINATIONS_REQUEST })).toEqual(finalState);
  });
  it("should handle GET_DESTINATIONS_SUCCESS", () => {
    const initialState: DestinationState = {
      loading: true,
      destinations: { allIds: [], byId: {} }
    };
    const finalState: DestinationState = {
      loading: false,
      destinations: {
        allIds: ["PRG"],
        byId: {
          PRG: {
            DestinationID: 5683364,
            AirportCode: "PRG",
            AirportCityName: "Prague",
            AirportName: "Ruzyne",
            AirportCountryCode: "CZ",
            LanguageCode: "en",
            OfferCount: 0
          }
        }
      }
    };
    expect(
      reducer(initialState, {
        type: GET_DESTINATIONS_SUCCESS,
        payload: {
          entities: {
            destinations: {
              PRG: {
                DestinationID: 5683364,
                AirportCode: "PRG",
                AirportCityName: "Prague",
                AirportName: "Ruzyne",
                AirportCountryCode: "CZ",
                LanguageCode: "en",
                OfferCount: 0
              }
            }
          },
          result: ["PRG"]
        }
      })
    ).toEqual(finalState);
  });
  it("should handle GET_DESTINATIONS_FAILURE", () => {
    const initialState: DestinationState = {
      loading: true,
      destinations: { allIds: [], byId: {} }
    };
    const finalState: DestinationState = {
      loading: false,
      destinations: { allIds: [], byId: {} }
    };
    expect(reducer(initialState, { type: GET_DESTINATIONS_FAILURE, payload: new Error("err") })).toEqual(finalState);
  });
});
