import React from "react";
import { Container } from "next/app";
import { GlobalStyle } from "../styles/GlobalStyle";
import { Provider } from "react-redux";
import { MyAppProps, MyAppContext } from "../types/appTypes";
import withRedux from "next-redux-wrapper";
import { initializeStore } from "../store/store";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "moment/locale/cs";

class MyApp extends React.Component<MyAppProps> {
  static async getInitialProps({ Component, ctx }: MyAppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <MuiPickersUtilsProvider utils={MomentUtils} locale="cs">
            <GlobalStyle />
            <Component {...pageProps} />
          </MuiPickersUtilsProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initializeStore)(MyApp);
