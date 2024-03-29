import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: 0;
    border: 0;
  }

  body {
    background: #312e38;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  input {
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: #fff;
  }


  `;
