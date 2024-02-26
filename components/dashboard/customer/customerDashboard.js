'use client';
import React, { useEffect, useState } from 'react';
import { Typography, Box, Stack, Avatar } from '@mui/material';
import { useTheme } from '@mui/system';
import SearchBar from '@/components/search/search';
import DeliveryListCustomer from './deliveryListCustomer';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const CustomerDashboard = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Orders');
  const customerDeliveryTabs = [
    {
      status: 'Orders',
      total: 24,
    },
    {
      status: 'Delivery',
      total: 5,
    },
  ];

  useEffect(() => {
    if (user.role !== 'Customer') {
      router.replace('/auth');
    }
  }, [user, router]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box
      sx={{
        color: theme.palette.gray.darker,
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
        <Stack spacing={4}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
            {user.name}
          </Typography>
          <Typography sx={{ fontSize: '12px' }}>
            {`Completed Order: $${65}`}
          </Typography>
        </Stack>
        <Avatar src={user.picture} />
      </Box>
      <Box>
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
          {customerDeliveryTabs.map((item, index) => (
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
          <>
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
                {selectedCategory === 'Orders'
                  ? 'Orders Awaiting Delivery'
                  : selectedCategory === 'Delivery'
                  ? 'Orders Delivered'
                  : ''}
              </Typography>
              {/* <DateFilter /> */}
            </Box>
            <DeliveryListCustomer selectedTab={selectedCategory} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default CustomerDashboard;
