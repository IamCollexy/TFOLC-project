'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box, Grid, Stack } from '@mui/material';
import { useTheme } from '@mui/system';
import DeliveryList from './deliveryList';
import SearchBar from '@/components/search/search';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updateLocation } from '@/store/slices/userSlice';
import axios from 'axios';
// import DateFilter from './FiltDelByDate';

const DeliveryDashboard = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] =
    useState('Available');
  const [userState, setUserState] = useState('');

  const DeliveryTabs = [
    {
      status: 'Available',
      total: 24,
    },
    {
      status: 'In-Transit',
      total: 5,
    },
  ];
  useEffect(() => {
    if (user.role !== 'Agent') {
      router.replace('/auth');
    }
    console.log(user);
  }, [user, router]);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(
        updateLocation({ longitude: longitude, latitude: latitude })
      );
      const apiKey = '55346314d85095238defdeee438085aa';

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      axios
        .get(weatherUrl)
        .then((response) => {
          setUserState(response.data.name);
        })
        .catch((error) => {
          console.error('Error fetching location:', error);
        });
    }

    function error(error) {
      console.error('Geolocation error:', error);
      setError('Geolocation error');
    }

    // Get the user's location
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);
  return (
    <Box
      sx={{
        color: theme.palette.gray.darker,
        width: '100%',
        mb: '50px',
      }}
    >
      <SearchBar />
      <Box
        sx={{
          backgroundImage: `url('/redBg.jpg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          width: '95%',
          m: '20px auto',
          color: theme.palette.common.white,
          p: 2,
          borderRadius: '3px',
          height: '110px',
        }}
      >
        <Stack spacing={1}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
            {user.name}
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            {`Total Earnings: $${65}`}
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            {`Location: ${userState}`}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontSize: '14px' }}>
            {`Rating: 4`}
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            {`Trips: ${25}`}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          width: { xs: '95%', md: '80%' },
          margin: '0 auto',
          marginTop: '20px',
          padding: 2,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {DeliveryTabs.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              borderRadius: '2px',
              textAlign: 'center',
              width: { xs: '130px', md: 'auto' },
              marginBottom: 2,
              height: { xs: '40px', md: 'auto' },
              color:
                selectedCategory === item.status
                  ? 'common.white'
                  : theme.palette.gray.darker,

              backgroundColor:
                selectedCategory === item.status
                  ? 'primary.main'
                  : 'gray.lightest',
            }}
            onClick={() => handleCategoryClick(item.status)}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: '14px',
                }}
                fontWeight={600}
                variant="subtitle1"
              >
                {item.status}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      {selectedCategory !== null && (
        <Box>
          <Box
            sx={{
              width: '95%',
              mx: 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              mb={'5px'}
              fontSize={'14px'}
              fontWeight={'bold'}
            >
              Delivery Jobs
            </Typography>
            {/* <DateFilter /> */}
          </Box>
          <DeliveryList selectedTab={selectedCategory} />
        </Box>
      )}
    </Box>
  );
};

export default DeliveryDashboard;
