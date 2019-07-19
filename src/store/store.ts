import { createStore, applyMiddleware, Action, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer, { DestinationState } from "./destination";

export interface RootState extends DestinationState {}

export interface RootAction extends Action<any> {}

export type AppStore = Store<RootState, RootAction>;

export const initializeStore = (initialState: any) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware()));
};
