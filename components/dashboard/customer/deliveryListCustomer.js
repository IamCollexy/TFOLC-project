import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Paper,
  Stack,
  Box,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/system';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DeliveryListCustomer = ({ selectedTab }) => {
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const salesDelivery = useSelector((state) => state.delivery);
  const [customerDelivery, setCustomerDelivery] = useState([]);
  useEffect(() => {
    const filteredDeliveries = salesDelivery.filter((item) => {
      if (selectedTab === 'Orders') {
        return (
          item.salesDeliveryStatus === 'In-Transit' &&
          item.customer?.trim().toLowerCase() ===
            user.name?.trim().toLowerCase()
        );
      } else if (selectedTab === 'Delivery') {
        return (
          item.salesDeliveryStatus === 'Completed' &&
          item.customer?.trim().toLowerCase() ===
            user.name?.trim().toLowerCase()
        );
      }
      return false;
    });
    console.log(filteredDeliveries);
    setCustomerDelivery(filteredDeliveries);
  }, [user, salesDelivery, selectedTab]);

  return (
    <Paper
      sx={{
        padding: 2,
        color: theme.palette.gray.darker,
        maxHeight: '300px',
        overflowY: 'scroll',
      }}
    >
      {customerDelivery &&
        customerDelivery.map((item) => (
          <Card
            sx={{
              p: 1,
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            key={item.id}
          >
            <Stack>
              <Box
                sx={{
                  width: 'max-content',
                }}
              >
                <Typography
                  sx={{
                    color: 'text.disabled',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    mr: '10px',
                  }}
                >
                  {`  Order ${item.id}`}
                </Typography>
              </Box>
              <Typography variant="body2">{`Company: ${item.company}`}</Typography>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              <Link
                href={{
                  pathname: `/dashboard/customer/${item.id}`,
                  query: { id: item.id },
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: theme.palette.text.disabled,
                    height: '30px',
                    width: '30px',
                  }}
                >
                  <VisibilityIcon
                    sx={{
                      fontSize: 'small',
                      fill: theme.palette.common.white,
                    }}
                  />
                </IconButton>
              </Link>
            </Stack>
          </Card>
        ))}
    </Paper>
  );
};

export default DeliveryListCustomer;
