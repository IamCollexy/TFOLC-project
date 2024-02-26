'use client';
import { Inter } from 'next/font/google';
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/system';
import DashboardTopNav from '@/components/navbar/dashboardTopNav';
import DashboardSideNav from '@/components/navbar/dashboardSideNav';
import DashboardBottomNav from '@/components/navbar/bottomNav';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <DashboardTopNav />
          <Grid
            container
            spacing={smallScreen ? 0 : 2}
            sx={{
              width: '100%',
              margin: '0px auto',
              marginTop: { md: 10 },
            }}
          >
            <Grid item xs={0} xl={3} sx={{ ml: { md: -2, sm: 0 } }}>
              <DashboardSideNav />
            </Grid>
            <Grid item xs={12} md={9}>
              <Box
                component="section"
                sx={{
                  width: '100%',
                  padding: { md: 3 },
                  paddingTop: { xs: 4, md: 8 },
                }}
              >
                <ThemeProvider theme={theme}>
                  {children}
                </ThemeProvider>
              </Box>
              {smallScreen && <DashboardBottomNav />}
            </Grid>
          </Grid>
        </Box>
      </body>
    </html>
  );
}
