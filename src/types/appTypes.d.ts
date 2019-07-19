import { AppContext, AppProps } from "next/app";
import { AppStore } from "../store/store";
import { NextPageContext } from "next";

export type MyAppPageContext = NextPageContext & { store: AppStore };

export interface MyAppContext extends AppContext {
  ctx: MyAppPageContext;
}

export interface MyAppProps extends AppProps {
  store: AppStore;
}
