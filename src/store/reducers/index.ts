import destination from "./destination";
import flight from "./flight";
import { combineReducers } from "redux";

const reducers = { destination, flight };

export const rootReducer = combineReducers(reducers);
