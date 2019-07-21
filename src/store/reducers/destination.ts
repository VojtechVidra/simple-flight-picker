import { Airport } from "../../types/types";
import { Action, Reducer } from "redux";
import { getAllDestinationsApiCall } from "../../api/api";
import { MyThunkResult, RootState, RootAction } from "../../types/store";

export const GET_DESTINATIONS_REQUEST = "GET_DESTINATIONS_REQUEST";
export const GET_DESTINATIONS_SUCCESS = "GET_DESTINATIONS_SUCCESS";
export const GET_DESTINATIONS_FAILURE = "GET_DESTINATIONS_FAILURE";

export interface DestinationState {
  destinations: Airport[];
  loading: boolean;
}

const initialState: DestinationState = {
  destinations: [],
  loading: false
};

export type DestinationActionTypes =
  | GetDestinationsRequestAction
  | GetDestinationsSuccessAction
  | GetDestinationsFailureAction;

const destination: Reducer<DestinationState, RootAction> = (state = initialState, action) => {
  switch (action.type) {
    case GET_DESTINATIONS_REQUEST:
      return { ...state, loading: true };
    case GET_DESTINATIONS_SUCCESS:
      return { ...state, loading: false, destinations: action.payload };
    case GET_DESTINATIONS_FAILURE: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default destination;

type GetDestinationsRequestAction = Action<typeof GET_DESTINATIONS_REQUEST>;
type GetDestinationsSuccessAction = Action<typeof GET_DESTINATIONS_SUCCESS> & {
  payload: Airport[];
};
type GetDestinationsFailureAction = Action<typeof GET_DESTINATIONS_FAILURE> & {
  payload: Error;
};

export const getAllDestinationsAction = (): MyThunkResult<
  GetDestinationsRequestAction | GetDestinationsSuccessAction | GetDestinationsFailureAction
> => dispatch => {
  dispatch({ type: GET_DESTINATIONS_REQUEST });
  return getAllDestinationsApiCall()
    .then(data => dispatch({ type: GET_DESTINATIONS_SUCCESS, payload: data }))
    .catch(err => dispatch({ type: GET_DESTINATIONS_FAILURE, payload: err }));
};

export const getDestinations = ({ destination: { destinations } }: RootState): Airport[] => destinations;
