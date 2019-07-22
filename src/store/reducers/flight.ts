import { FlightWithId, ConvertedCalendarPriceList } from "../../types/types";
import { Reducer, Action } from "redux";
import { RootAction, MyThunkResult } from "../../types/store";
import { ConvertedFlights, convertFlights } from "../../lib/flightsConverter";
import { getPricesApiCall } from "../../api/api";

export const GET_FLIGHTS_REQUEST = "GET_FLIGHTS_REQUEST";
export const GET_FLIGHTS_SUCCESS = "GET_FLIGHTS_SUCCESS";
export const GET_FLIGHTS_FAILURE = "GET_FLIGHTS_FAILURE";

export interface FlightState {
  loading: boolean;
  flights: { [id: string]: FlightWithId };
  calendarPriceList: {
    byId: {
      [key: string]: ConvertedCalendarPriceList;
    };
    allIds: string[];
  };
}

const initialState: FlightState = {
  loading: false,
  flights: {},
  calendarPriceList: {
    byId: {},
    allIds: []
  }
};

export type FlightActionTypes = GetPricesRequestAction | GetPricesSuccessAction | GetPricesFailureAction;

const flight: Reducer<FlightState, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case GET_FLIGHTS_REQUEST:
      return { ...state, loading: true };
    case GET_FLIGHTS_SUCCESS:
      return {
        ...state,
        loading: false,
        flights: {
          ...state.flights,
          ...action.payload.entities.flights
        },
        calendarPriceList: {
          byId: {
            ...state.calendarPriceList.byId,
            ...action.payload.entities.calendarPriceList
          },
          allIds: [...state.calendarPriceList.allIds, action.payload.result]
        }
      };
    case GET_FLIGHTS_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default flight;

type GetPricesRequestAction = Action<typeof GET_FLIGHTS_REQUEST>;
const getPricesRequest = (): GetPricesRequestAction => ({ type: GET_FLIGHTS_REQUEST });
type GetPricesSuccessAction = Action<typeof GET_FLIGHTS_SUCCESS> & {
  payload: ConvertedFlights;
};
const getPricesSuccess = (payload: ConvertedFlights): GetPricesSuccessAction => ({
  type: GET_FLIGHTS_SUCCESS,
  payload
});
type GetPricesFailureAction = Action<typeof GET_FLIGHTS_FAILURE> & {
  payload: Error;
};
const getPricesFailure = (payload: Error): GetPricesFailureAction => ({ type: GET_FLIGHTS_FAILURE, payload });

export const getPrices = (
  departure: string,
  arrival: string,
  month: string,
  sectorId: string = "0",
  langugage: string = "en",
  idLocation: string = "cz"
): MyThunkResult<GetPricesRequestAction | GetPricesSuccessAction | GetPricesFailureAction> => dispatch => {
  dispatch(getPricesRequest());
  return getPricesApiCall(departure, arrival, month, sectorId, langugage, idLocation)
    .then(data => dispatch(getPricesSuccess(convertFlights(data.calendarPriceList))))
    .catch(err => dispatch(getPricesFailure(err)));
};
