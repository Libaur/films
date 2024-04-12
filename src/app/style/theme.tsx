import './palette';
import React from 'react';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const styles = `
body {
  background-color: #EDDEDE
}`;

export const theme = createTheme({
  palette: {
    primary: {
      main: '#637878',
    },
    secondary: {
      main: '#E2E1E9',
    },
    error: {
      main: '#FF7373',
    },
    background: {
      default: '#FFF7FA',
    },
    supplement: {
      main: '#A8677E',
    },
  },
});

export const Theme = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <Container sx={{ display: 'flex', backgroundColor: 'background.default' }}>
      {children}
    </Container>
  </ThemeProvider>
);
