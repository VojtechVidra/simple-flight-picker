import { AppContext, AppProps } from "next/app";
import { NextPageContext } from "next";
import { AppStore } from "./store";

export type MyAppPageContext = NextPageContext & { store: AppStore };

export interface MyAppContext extends AppContext {
  ctx: MyAppPageContext;
}

export interface MyAppProps extends AppProps {
  store: AppStore;
}
