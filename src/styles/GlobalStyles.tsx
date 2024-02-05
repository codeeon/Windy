import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
    
    transition : color 200ms ease-in-out;
    transition : background-color 200ms ease-in-out;
  }
  body {
    background-color: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.text};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export default GlobalStyles;
