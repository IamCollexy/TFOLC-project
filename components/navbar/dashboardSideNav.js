import React, { useState } from 'react';
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Typography,
  useTheme,
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { Person, Settings } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useSelector } from 'react-redux';

function DashboardSideNav() {
  const router = useRouter();
  const theme = useTheme();
  const pathname = usePathname();
  const user = useSelector((state) => state.user);

  const [displaySideNav, setDisplaySideNav] = useState(false);

  const toggleSideNavDisplay = () => {
    setDisplaySideNav(!displaySideNav);
  };

  const listItemTextColor = (route) =>
    pathname === route ? 'common.white' : 'text.disabled';

  const listItemIconColor = (route) =>
    pathname === route ? theme.palette.common.white : 'text.disabled';

  const handleListItemClick = (route) => () => {
    toggleSideNavDisplay();
    router.push(route);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/auth');
  };
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        zIndex: 1000000,
      }}
    >
      {/* <IconButton
        position="absolute"
        sx={{
          display: { lg: 'none' },
          left: {
            xs: displaySideNav ? 250 : 2,
          },
          top: { xs: 60, sm: 80, md: 60 },
          background: theme.palette.primary.main,
          opacity: 0.8,
          zIndex: 2000,
        }}
        onClick={toggleSideNavDisplay}
      >
        {displaySideNav ? (
          <ArrowBackIcon
            sx={{
              fill: 'primary.main',
              color: 'common.white',
              display: { xl: 'none' },
            }}
          />
        ) : (
          <ArrowForwardIcon
            sx={{
              fill: 'primary.main',
              color: 'common.white',
              display: { xl: 'none' },
            }}
          />
        )}
      </IconButton> */}
      <Box
        sx={{
          height: '100%',
          width: '100%',
          bgcolor: 'transparent',
          padding: 3,
          paddingLeft: 0,
          paddingTop: 2,
          position: 'relative',
        }}
      >
        <List
          component="nav"
          sx={{
            position: 'fixed',
            top: { sm: 105, md: 108 },
            width: { xs: displaySideNav ? '260px' : 0, xl: '400px' },
            height: '100vh',
            boxShadow: '4px 0px 8px rgba(0, 0, 0, 0.1)',
            bgcolor: 'common.white',
            pt: '50px',
            left: 0,
          }}
        >
          {user && user.role !== 'customer' ? (
            <ListItemButton
              selected={pathname === '/dashboard'}
              onClick={handleListItemClick('/dashboard')}
              sx={{
                display: {
                  xs: displaySideNav ? 'block' : 'none',
                  xl: 'block',
                },
                transition: 'width 0.3s',
                width: {
                  xs: displaySideNav ? '250px' : 0,
                  xl: '300px',
                },
              }}
            >
              <Box
                sx={{
                  bgcolor:
                    pathname === '/dashboard'
                      ? 'primary.main'
                      : 'common.white',
                  flex: 1,
                  padding: 1,
                  paddingLeft: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <ListItemIcon>
                  <LocalShippingIcon
                    sx={{
                      fill: listItemIconColor('/dashboard'),
                    }}
                  />
                </ListItemIcon>
                <Typography
                  variant="caption"
                  color={listItemTextColor('/dashboard')}
                  fontSize={14}
                >
                  Delivery
                </Typography>
              </Box>
            </ListItemButton>
          ) : null}
          <ListItemButton
            selected={pathname === '/dashboard/profile'}
            onClick={handleListItemClick('/dashboard/profile')}
            sx={{
              display: {
                xs: displaySideNav ? 'block' : 'none',
                xl: 'block',
              },
              transition: 'width 0.3s',
              width: {
                xs: displaySideNav ? '250px' : 0,
                xl: '300px',
              },
            }}
          >
            <Box
              sx={{
                bgcolor:
                  pathname === '/dashboard/profile'
                    ? 'primary.main'
                    : 'common.white',
                flex: 1,
                padding: 1,
                paddingLeft: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ListItemIcon>
                <Person
                  sx={{
                    fill: listItemIconColor('/dashboard/profile'),
                  }}
                />
              </ListItemIcon>
              <Typography
                variant="caption"
                color={listItemTextColor('/dashboard/profile')}
                fontSize={14}
              >
                Profile
              </Typography>
            </Box>
          </ListItemButton>

          {/* TODO ACCOUNT SETTINGS */}
          <ListItemButton
            selected={pathname === '/dashboard/settings'}
            onClick={handleListItemClick('/dashboard/settings')}
            sx={{
              display: {
                xs: displaySideNav ? 'block' : 'none',
                xl: 'block',
              },
              transition: 'width 0.3s',
              width: {
                xs: displaySideNav ? '250px' : 0,
                xl: '300px',
              },
            }}
          >
            <Box
              sx={{
                bgcolor:
                  pathname === '/dashboard/settings'
                    ? 'primary.main'
                    : 'common.white',
                flex: 1,
                padding: 1,
                paddingLeft: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ListItemIcon>
                <Settings
                  sx={{
                    fill: listItemIconColor('/dashboard/settings'),
                  }}
                />
              </ListItemIcon>
              <Typography
                variant="caption"
                color={listItemTextColor('/dashboard/settings')}
                fontSize={14}
              >
                Settings
              </Typography>
            </Box>
            {/* </Link> */}
          </ListItemButton>

          <ListItemButton
            onClick={handleLogout}
            sx={{
              display: {
                xs: displaySideNav ? 'block' : 'none',
                xl: 'block',
              },
              transition: 'width 0.3s',
              width: {
                xs: displaySideNav ? '250px' : 0,
                xl: '300px',
              },
            }}
          >
            <Box
              sx={{
                flex: 1,
                padding: 1,
                paddingLeft: 4,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>

              <Typography variant="caption" fontSize={14}>
                Logout
              </Typography>
            </Box>
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
}

export default DashboardSideNav;
