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
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSelector, useDispatch } from 'react-redux';
import { moveToInTransit } from '@/store/slices/deliverySlice';

const DeliveryList = ({ selectedTab }) => {
  const salesDelivery = useSelector((state) => state.delivery);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [updatedDelivery, setUpdatedDelivery] = useState([]);
  useEffect(() => {
    const selectedDelivery = salesDelivery.filter(
      (delivery) =>
        (delivery.salesDeliveryStatus === 'Assigned' &&
          selectedTab === 'Available' &&
          delivery.completed !== true &&
          delivery.company === user.company) ||
        (delivery.salesDeliveryStatus === selectedTab &&
          delivery.completed !== true &&
          delivery.company === user.company)
    );

    setUpdatedDelivery(selectedDelivery);
    // dispatch(setUpdatedDelivery(selectedDelivery));
  }, [salesDelivery, selectedTab]);

  const handlePickUp = (id) => {
    dispatch(
      moveToInTransit({
        id: id,
        agentName: user.name,
      })
    );
  };

  return (
    <Paper
      sx={{
        padding: 2,
        color: theme.palette.gray.darker,
        maxHeight: '300px',
        overflowY: 'scroll',
      }}
    >
      {updatedDelivery &&
        updatedDelivery.map((item) => (
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
              ></Box>
              <Typography variant="body2">{item.customer}</Typography>
            </Stack>

            <Stack direction={'row'} spacing={2}>
              {selectedTab !== 'In-Transit' && (
                <IconButton
                  onClick={() => {
                    handlePickUp(item.id);
                  }}
                  sx={{
                    '&:active': {
                      color: theme.palette.secondary,
                    },
                    bgcolor: theme.palette.secondary.main,
                    height: '30px',
                    width: '30px',
                  }}
                >
                  <CheckIcon
                    sx={{
                      fill: theme.palette.standardSuccess.color,
                      fontSize: 'small',
                    }}
                  />
                </IconButton>
              )}
              <Link
                href={{
                  pathname: `/dashboard/delivery/${item.id}`,
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

export default DeliveryList;
