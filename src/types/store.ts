import { rootReducer } from "../store/reducers";
import { DestinationActionTypes } from "../store/reducers/destination";
import { Store, AnyAction } from "redux";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { MapStateToProps } from "react-redux";
import { FlightActionTypes } from "../store/reducers/flight";

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = DestinationActionTypes | FlightActionTypes;

export type Dispatch = ThunkDispatch<RootState, undefined, RootAction>;
export type AppStore = Store<RootState, RootAction> & {
  dispatch: Dispatch;
};

export type MyThunkResult<A extends AnyAction, R = any> = ThunkAction<R, RootState, undefined, A>;

export type MyMapStateToProps<Props, OwnProps = any> = MapStateToProps<Props, OwnProps, RootState>;
