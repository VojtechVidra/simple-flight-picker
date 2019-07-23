import {
  FlightWithId,
  ConvertedCalendarPriceList,
  DayListConverted,
  DayListFromStore,
  Airport
} from "../../types/types";
import { Reducer, Action } from "redux";
import { RootAction, MyThunkResult, RootState } from "../../types/store";
import { ConvertedFlights, convertFlights, getCalendarId } from "../../lib/flightsNormalizer";
import { getPricesApiCall } from "../../api/api";
import { getDestination } from "./destination";
import { normalizeDestinations } from "../../lib/destinationNormalizer";

export const GET_FLIGHTS_REQUEST = "GET_FLIGHTS_REQUEST";
export const GET_FLIGHTS_SUCCESS = "GET_FLIGHTS_SUCCESS";
export const GET_FLIGHTS_FAILURE = "GET_FLIGHTS_FAILURE";
export const GET_FLIGHTS_CANCEL = "GET_FLIGHTS_CANCEL";

export interface FlightState {
  loading: boolean;
  flights: { [id: string]: FlightWithId };
  daylists: { [id: string]: DayListConverted };
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
  daylists: {},
  calendarPriceList: {
    byId: {},
    allIds: []
  }
};

export type FlightActionTypes =
  | GetPricesRequestAction
  | GetPricesSuccessAction
  | GetPricesFailureAction
  | GetPricesCancelAction;

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
        daylists: { ...state.daylists, ...action.payload.entities.daylists },
        calendarPriceList: {
          byId: {
            ...state.calendarPriceList.byId,
            ...action.payload.entities.calendarPriceList
          },
          allIds: [...state.calendarPriceList.allIds, action.payload.result]
        }
      };
    case GET_FLIGHTS_FAILURE:
    case GET_FLIGHTS_CANCEL:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default flight;

let abortController: null | AbortController = null;

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
type GetPricesCancelAction = Action<typeof GET_FLIGHTS_CANCEL>;
const getPricesCancel = (): GetPricesCancelAction => ({ type: GET_FLIGHTS_CANCEL });

export const getPricesAction = (
  departure: string,
  arrival: string,
  month: string,
  sectorId: string = "0",
  langugage: string = "en",
  idLocation: string = "cz"
): MyThunkResult<GetPricesRequestAction | GetPricesSuccessAction | GetPricesFailureAction | GetPricesCancelAction> => (
  dispatch,
  getState
) => {
  abortController && abortController.abort();

  let signal;
  if (typeof AbortController !== "undefined") {
    abortController = new AbortController();
    signal = abortController.signal;
    signal.addEventListener("abort", () => {
      dispatch(getPricesCancel());
    });
  }

  const allreadyFetched = new Set(getState().flight.calendarPriceList.allIds);
  if (!allreadyFetched.has(getCalendarId(departure, arrival, month))) {
    dispatch(getPricesRequest());
    return getPricesApiCall({ departure, arrival, month, sectorId, langugage, idLocation }, { signal })
      .then(data => dispatch(getPricesSuccess(convertFlights(data.calendarPriceList))))
      .catch(err => dispatch(getPricesFailure(err)));
  }
};

const getFlight = ({ flight: { flights } }: RootState, id: string): FlightWithId | undefined => flights[id];

const getCalendarPriceList = (
  { flight: { calendarPriceList } }: RootState,
  id: string
): ConvertedCalendarPriceList | undefined => calendarPriceList.byId[id];

const getDayList = ({ flight: { daylists } }: RootState, id: string): DayListConverted | undefined => daylists[id];

export const getPrices = (state: RootState, calendarPriceListId: string): DayListFromStore[] => {
  const calendar = getCalendarPriceList(state, calendarPriceListId);
  if (calendar) {
    const dayListIds = calendar.dayList;
    return dayListIds.reduce((acc: DayListFromStore[], curr) => {
      const maybeDayList = getDayList(state, curr);
      if (maybeDayList) {
        const flights = maybeDayList.flights.reduce((flights: FlightWithId[], fId) => {
          const maybeFlight = getFlight(state, fId);
          if (maybeFlight) {
            flights.push(maybeFlight);
          }
          return flights;
        }, []);
        acc.push({ ...maybeDayList, flights });
      }
      return acc;
    }, []);
  }
  return [];
};

export const arePricesLoading = ({ flight: { loading } }: RootState) => loading;

export const getAllAirportsFromDayList = (
  state: RootState,
  daylist: DayListFromStore
): { [AirportCode: string]: Airport } => {
  const AiportCodeSet: Set<string> = new Set();
  daylist.flights.map(({ arrIata, depIata }) => {
    AiportCodeSet.add(arrIata);
    AiportCodeSet.add(depIata);
  });

  let airports: Airport[] = [];
  AiportCodeSet.forEach(c => {
    const airport = getDestination(state, c);
    if (airport) {
      airports.push(airport);
    }
  });
  return normalizeDestinations(airports).entities.destinations;
};
