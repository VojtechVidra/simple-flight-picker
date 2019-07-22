import { Airport } from "../../types/types";
import { Action, Reducer } from "redux";
import { getAllDestinationsApiCall } from "../../api/api";
import { MyThunkResult, RootState, RootAction } from "../../types/store";
import { ConvertedDestinations, normalizeDestinations } from "../../lib/destinationNormalizer";

export const GET_DESTINATIONS_REQUEST = "GET_DESTINATIONS_REQUEST";
export const GET_DESTINATIONS_SUCCESS = "GET_DESTINATIONS_SUCCESS";
export const GET_DESTINATIONS_FAILURE = "GET_DESTINATIONS_FAILURE";

export interface DestinationState {
  destinations: {
    byId: {
      [AirportCode: string]: Airport;
    };
    allIds: string[];
  };
  loading: boolean;
}

const initialState: DestinationState = {
  destinations: {
    byId: {},
    allIds: []
  },
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
      return {
        ...state,
        loading: false,
        destinations: {
          byId: { ...state.destinations.byId, ...action.payload.entities.destinations },
          allIds: [...state.destinations.allIds, ...action.payload.result]
        }
      };
    case GET_DESTINATIONS_FAILURE: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default destination;

type GetDestinationsRequestAction = Action<typeof GET_DESTINATIONS_REQUEST>;
const getDestinationsRequest = (): GetDestinationsRequestAction => ({ type: GET_DESTINATIONS_REQUEST });
type GetDestinationsSuccessAction = Action<typeof GET_DESTINATIONS_SUCCESS> & {
  payload: ConvertedDestinations;
};
const getDestinationsSuccess = (payload: ConvertedDestinations): GetDestinationsSuccessAction => ({
  type: GET_DESTINATIONS_SUCCESS,
  payload
});
type GetDestinationsFailureAction = Action<typeof GET_DESTINATIONS_FAILURE> & {
  payload: Error;
};
const GetDestinationsFailure = (payload: Error): GetDestinationsFailureAction => ({
  type: GET_DESTINATIONS_FAILURE,
  payload
});

export const getAllDestinationsAction = (): MyThunkResult<
  GetDestinationsRequestAction | GetDestinationsSuccessAction | GetDestinationsFailureAction
> => dispatch => {
  dispatch(getDestinationsRequest());
  return getAllDestinationsApiCall()
    .then(data => dispatch(getDestinationsSuccess(normalizeDestinations(data))))
    .catch(err => dispatch(GetDestinationsFailure(err)));
};

export const getDestination = (
  {
    destination: {
      destinations: { byId }
    }
  }: RootState,
  id: string
): Airport | undefined => byId[id];

export const getDestinations = (state: RootState): Airport[] => {
  const ids = state.destination.destinations.allIds;
  return ids.reduce((acc: Airport[], curr) => {
    const maybeDestination = getDestination(state, curr);
    if (maybeDestination) {
      acc.push(maybeDestination);
    }
    return acc;
  }, []);
};
