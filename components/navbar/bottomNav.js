import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Dashboard } from '@mui/icons-material';
import { Box, Grid, IconButton } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/system';
import { useSelector } from 'react-redux';

const DashboardBottomNav = () => {
  const user = useSelector((state) => state.user);
  const pathname = usePathname();
  const theme = useTheme();
  const router = useRouter();
  // const smallScreen = useMediaQuery('(max-width:649px)');
  // const largeScreen = useMediaQuery('(min-width:650px)');

  // handle icon color
  const listItemIconColor = (route, route2, route3) =>
    pathname === route || pathname === route2 || pathname === route3
      ? theme.palette.common.white
      : 'text.disabled';

  // handle routing
  const handleListItemClick = (route) => () => {
    router.push(route);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          backgroundColor: 'common.white',
          color: 'common.black',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it's above other elements
        }}
      >
        <Toolbar
          sx={{
            margin: '0px auto',
            width: '95%',
          }}
        >
          <Grid container>
            <Grid
              item
              xs={3}
              sx={{
                justifyContent: 'center',
                display: 'flex',
                bgcolor:
                  pathname === '/' ? 'primary.main' : 'common.white',
              }}
            >
              <IconButton
              // onClick={handleListItemClick('/')}
              >
                <HomeIcon
                  sx={{
                    fill: listItemIconColor('/'),
                  }}
                />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                justifyContent: 'center',
                display: 'flex',
                bgcolor:
                  pathname === '/dashboard' ||
                  pathname === '/dashboard/customer' ||
                  pathname === '/dashboard/admin'
                    ? 'primary.main'
                    : 'common.white',
              }}
            >
              <IconButton
                onClick={handleListItemClick(
                  user.role === 'Customer'
                    ? '/dashboard/customer'
                    : user.role === 'Agent'
                    ? '/dashboard/agent'
                    : user.role === 'Admin'
                    ? '/dashboard/admin'
                    : '/'
                )}
              >
                <Dashboard
                  sx={{
                    fill: listItemIconColor(
                      '/dashboard',
                      '/dashboard/customer',
                      '/dashboard/admin'
                    ),
                  }}
                />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                justifyContent: 'center',
                display: 'flex',
                bgcolor:
                  pathname === '/dashboard/profile'
                    ? 'primary.main'
                    : 'common.white',
              }}
            >
              <IconButton
                onClick={handleListItemClick('/dashboard/profile')}
              >
                <PersonIcon
                  sx={{
                    fill: listItemIconColor('/dashboard/profile'),
                  }}
                />
              </IconButton>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                justifyContent: 'center',
                display: 'flex',
                bgcolor:
                  pathname === '/dashboard/settings'
                    ? 'primary.main'
                    : 'common.white',
              }}
            >
              <IconButton
                onClick={handleListItemClick('/dashboard/settings')}
              >
                <SettingsIcon
                  sx={{
                    fill: listItemIconColor('/dashboard/settings'),
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default DashboardBottomNav;
