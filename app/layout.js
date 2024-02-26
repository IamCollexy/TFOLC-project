'use client';
import { Inter } from 'next/font/google';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/src/theme/theme';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/store/store';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/globals.css" />
        <link rel="icon" href="/Logo.png" type="image/x-icon" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossorigin
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
        <title>Delivery Service</title>
      </head>
      <body className={inter.className}>
        <CssBaseline enableColorScheme />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
