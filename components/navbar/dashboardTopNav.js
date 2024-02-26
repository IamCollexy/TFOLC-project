import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Search, ExpandMore } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import { Typography, Box, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Popover from '@mui/material/Popover';
import { useTheme } from '@mui/system';
import NotificationsPanel from './notifications';
import { useSelector } from 'react-redux';

const DashboardTopNav = () => {
  const theme = useTheme();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [toggleMenu, setToggleMenu] = useState(false);
  const smallScreen = useMediaQuery('(max-width:649px)');
  const largeScreen = useMediaQuery('(min-width:650px)');

  const HoverDropdown = ({ label, items }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <Box
          sx={{ cursor: 'pointer' }}
          aria-controls="hover-menu"
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: 'primary.dark',
              },
              fontSize: { xs: '14px', md: '18px' },
              fontWeight: 'bold',
            }}
          >
            {label}
            <ExpandMore
              sx={{
                '&:hover': {
                  color: 'primary.dark',
                },
                fontSize: 'large',
              }}
            />
          </Typography>
        </Box>
        {/* Dropdown menu */}
        <Popover
          id="hover-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          {items.map((item, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: { xs: '16px' },
                padding: '12px 24px',
                cursor: 'pointer',
                color: '#000',
              }}
              onClick={handleClose}
            >
              {item}
            </Typography>
          ))}
        </Popover>
      </>
    );
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'common.white',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar
          sx={{
            margin: '0px auto',
            width: '100%',
          }}
        >
          <Grid container alignItems={'center'}>
            <Grid xs={2} md={3}>
              {largeScreen && (
                <Box>
                  <Image
                    src={'/myishpos_logos.png'}
                    alt="delivery Icon"
                    width={150}
                    height={100}
                    onClick={() => router.push('/')}
                  />
                </Box>
              )}
              {smallScreen && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  onClick={() => {
                    setToggleMenu(!toggleMenu);
                  }}
                >
                  {!toggleMenu ? (
                    <MenuIcon
                      onClick={() => {
                        setToggleMenu(!toggleMenu);
                      }}
                      sx={{
                        fill: theme.palette.gray.darker,
                      }}
                    />
                  ) : (
                    <Typography sx={{ color: 'primary.main' }}>
                      Close
                    </Typography>
                  )}
                </IconButton>
              )}
            </Grid>
            <Grid xs={6}>
              {largeScreen && (
                <Box flexGrow={1}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: 'common.black',
                      width: { xs: '100%', md: '70%' },
                      px: { xs: '10px', md: 0 },
                      m: 'auto',
                    }}
                  >
                    <HoverDropdown
                      label="Services"
                      items={['Delivery', 'Shipping']}
                    />

                    <HoverDropdown
                      label="Discover"
                      items={[
                        'About Our Offers',
                        'About MyIshops Deliver',
                      ]}
                    />
                    <Link
                      href="#"
                      style={{
                        color: theme.palette.common.black,
                        textDecoration: 'none',
                      }}
                    >
                      <Typography
                        sx={{
                          '&:hover': {
                            color: 'primary.dark',
                          },
                          fontSize: { xs: '14px', md: '18px' },
                          fontWeight: 600,
                        }}
                      >
                        Contact Us
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              )}
              {smallScreen && <Box flex={1}></Box>}
            </Grid>
            <Grid xs={4} md={3}>
              {smallScreen && (
                <Box
                  flex={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    m: 'auto',
                    px: '10px',
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: '40px', md: '50px' },
                      height: { xs: '40px', md: '50px' },
                      borderRadius: 25,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid red',
                    }}
                  >
                    <Typography
                      sx={{ fontSize: { xs: '14px', md: '16px' } }}
                      fontWeight={600}
                      color={'common.white'}
                    >
                      {user && user.name
                        ? user.name[0].toUpperCase()
                        : 'B'}
                    </Typography>
                  </Box>
                  <NotificationsPanel />
                </Box>
              )}
              {/*User info  */}
              {largeScreen && (
                <Box
                  flex={1}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: { xs: '100%', md: '70%' },
                    m: 'auto',
                  }}
                >
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px',
                      borderRadius: 25,
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      color={'common.white'}
                    >
                      {user && user.name
                        ? user.name[0].toUpperCase()
                        : 'B'}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: 2,
                      color: 'common.black',
                      fontWeight: 600,
                    }}
                  >
                    Banabas Petrica
                    {/* {user?.fullName
                ? user.fullName
                : user?.organasationName
                ? user?.organasationName
                : user?.email} */}
                  </Typography>
                  <NotificationsPanel />
                </Box>
              )}
            </Grid>
          </Grid>
        </Toolbar>
        {/* Hamburger Menu */}
        {toggleMenu && smallScreen ? (
          <List
            sx={{
              position: 'absolute',
              color: theme.palette.gray.darker,
              width: '200px',
              top: 50,
            }}
          >
            <Box
              sx={{
                height: '250px',

                bgcolor: '#fff',
                borderRadius: '3px',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)',
              }}
            >
              <ListItem>
                <Box>
                  <Image
                    src={'/myishpos_logos.png'}
                    alt="delivery Icon"
                    width={150}
                    height={100}
                    onClick={() => router.push('/')}
                  />
                </Box>
              </ListItem>
              <ListItem>
                <HoverDropdown
                  label="Services"
                  items={['Delivery', 'Shipping']}
                />
              </ListItem>
              <ListItem>
                <HoverDropdown
                  label="Discover"
                  items={[
                    'About Our Offers',
                    'About MyIshops Deliver',
                  ]}
                />
              </ListItem>
              <ListItem>
                <Link
                  href="#"
                  style={{
                    color: theme.palette.text.disabled,
                    textDecoration: 'none',
                  }}
                >
                  <Typography
                    sx={{
                      '&:hover': {
                        color: theme.palette.secondary,
                      },
                      fontSize: '14px',
                      fontWeight: 600,
                    }}
                  >
                    Contact Us
                  </Typography>
                </Link>
              </ListItem>
            </Box>
          </List>
        ) : (
          <></>
        )}
      </AppBar>
    </Box>
  );
};

export default DashboardTopNav;
