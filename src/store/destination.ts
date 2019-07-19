import { Airport } from "../types/types";

export interface DestinationState {
  destinations: Airport[];
  count: number;
}

const initialState: DestinationState = {
  destinations: [],
  count: 0
};

const departure = (state: DestinationState = initialState, action: any): DestinationState => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

export default departure;
