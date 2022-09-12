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
    --shadow: 0px 0px 15px rgba(0,0,0, 0.6);
  }
  html{
    font-family: 'Poppins', sans-serif;
    font-size: 62.5%;
  }
`;