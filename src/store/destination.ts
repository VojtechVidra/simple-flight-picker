import { Airport } from "../types/types";
import { Action, Reducer } from "redux";
import { MyThunkResult, RootState } from "./store";
import { getAllDestinationsApiCall } from "../api/api";

const GET_DESTINATIONS_REQUEST = "GET_DESTINATIONS_REQUEST";
const GET_DESTINATIONS_SUCCESS = "GET_DESTINATIONS_SUCCESS";
const GET_DESTINATIONS_FAILURE = "GET_DESTINATIONS_FAILURE";

export interface DestinationState {
  destinations: Airport[];
  loading: boolean;
}

const initialState: DestinationState = {
  destinations: [],
  loading: false
};

const departure: Reducer<DestinationState, DestinationActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case GET_DESTINATIONS_REQUEST:
      return { ...state, loading: true };
    case GET_DESTINATIONS_SUCCESS:
      return { ...state, loading: false, destinations: action.payload };
    case GET_DESTINATIONS_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default departure;

type GetDestinationsRequestAction = Action<typeof GET_DESTINATIONS_REQUEST>;

type GetDestinationsSuccessAction = Action<typeof GET_DESTINATIONS_SUCCESS> & {
  payload: Airport[];
};

type GetDestinationsFailureAction = Action<typeof GET_DESTINATIONS_FAILURE> & {
  payload: Error;
};

export type DestinationActionTypes =
  | GetDestinationsRequestAction
  | GetDestinationsSuccessAction
  | GetDestinationsFailureAction;

export const getAllDestinationsAction = (): MyThunkResult<
  GetDestinationsRequestAction | GetDestinationsSuccessAction | GetDestinationsFailureAction
> => dispatch => {
  dispatch({ type: GET_DESTINATIONS_REQUEST });
  return getAllDestinationsApiCall()
    .then(data => dispatch({ type: GET_DESTINATIONS_SUCCESS, payload: data }))
    .catch(err => dispatch({ type: GET_DESTINATIONS_FAILURE, payload: err }));
};

export const getDestinations = ({ destinations }: RootState): Airport[] => destinations;
