import Document, { Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import { ServerStyleSheet } from "styled-components";

interface Props extends DocumentInitialProps {
  styleTags: React.ReactElement;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps({ renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();

    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
