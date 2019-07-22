import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap&subset=latin-ext');

  * {
    box-sizing: border-box;
  }

  body{
    font-family: 'Roboto', sans-serif;
    margin: 0
  }
`;
