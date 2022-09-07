import { createGlobalStyle } from "styled-components";


export const GlobalStyle = createGlobalStyle`
  *{
    padding: 0;
    margin: 0;
    border: 0;
    box-sizing: border-box;
    text-decoration: none;
  }
  :root{
    // cores
    --black: #2F2F2F;
    --white: #F5F5F5;
    --purple: #D00F83;
  }
`;