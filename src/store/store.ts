import { createStore, applyMiddleware, Store, AnyAction } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";

import reducer, { DestinationState, DestinationActionTypes } from "./destination";
import { MapStateToProps } from "react-redux";

export interface RootState extends DestinationState {}

export type RootAction = DestinationActionTypes;

export type Dispatch = ThunkDispatch<RootState, undefined, RootAction>;
export type AppStore = Store<RootState, RootAction> & {
  dispatch: Dispatch;
};

export const initializeStore = (initialState: any) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
};

export type MyThunkResult<A extends AnyAction, R = any> = ThunkAction<R, RootState, undefined, A>;

export type MyMapStateToProps<Props, OwnProps = any> = MapStateToProps<Props, OwnProps, RootState>;
