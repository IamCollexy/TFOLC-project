'use client';
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Divider,
  Button,
  OutlinedInput,
  FormControl,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { customerConfirmDelivery } from '@/store/slices/deliverySlice';

const DeliveryDetailsPage = () => {
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedDelivery, setSelectedDelivery] = useState({});
  const salesDelivery = useSelector((state) => state.delivery);
  const search = useSearchParams();
  const id = search.get('id');
  const router = useRouter();

  useEffect(() => {
    if (user.role !== 'Customer') {
      router.replace('/auth');
    }
  }, [user, router]);

  useEffect(() => {
    const foundDelivery = salesDelivery.find(
      (delivery) => delivery.id == id
    );
    setSelectedDelivery(foundDelivery);
  }, [salesDelivery]);

  const [confirmity, setConfirm] = useState(false);

  const handleSubmit = () => {
    dispatch(
      customerConfirmDelivery({
        id: selectedDelivery.id,
      })
    );

    router.push('/dashboard/customer');
  };

  const renderDeliveryItem = (item) => {
    return (
      <Box key={item.id} mb={2}>
        <Typography fontSize={16} my={1}>
          <span style={{ fontWeight: 600 }}>Description: </span>
          {item.description}
        </Typography>
        <Typography fontSize={16} mb={1}>
          <span style={{ fontWeight: 600 }}>Expected Quantity: </span>
          {item.qtyExpected}
        </Typography>
        <Typography fontSize={16} mb={1}>
          <span style={{ fontWeight: 600 }}>
            Delivered Quantity:{' '}
          </span>
          {item.qtyDelivered}
        </Typography>
        <Typography fontSize={16} mb={1}>
          <span style={{ fontWeight: 600 }}>Unit Price: </span>
          {item.unitPrice}
        </Typography>
        <Typography fontSize={16} mb={1}>
          <span style={{ fontWeight: 600 }}>Discount: </span>
          {item.discount}
        </Typography>
        <Typography fontSize={16} mb={1}>
          <span style={{ fontWeight: 600 }}> Amount: </span>
          {item.amount}
        </Typography>
        <Typography fontSize={16} mb={1}>
          <span style={{ fontWeight: 600 }}>Delivered: </span>
          {item.delivered ? 'Yes' : 'No'}
        </Typography>
        <Typography fontSize={16} mb={1}>
          <span style={{ fontWeight: 600 }}> Delivery Agent: </span>
          {item.deliveryAgent}
        </Typography>
        <Typography fontSize={16} mb={1}>
          <span style={{ fontWeight: 600 }}>Delivery Fee: </span>
          {item.deliveryAmount}
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        padding: 2,
        maxWidth: { md: '600px', lg: '700px' },
        margin: '10px auto',
        mb: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
      }}
    >
      <Box
        sx={{
          backgroundImage: `url('/redBg.jpg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          width: '100%',
          border: '1px solid red',
          mb: '10px',
        }}
      >
        <Stack
          spacing={4}
          sx={{
            ml: '10px',
            padding: 1,
            width: '200px',
            height: '100px',
          }}
        >
          <Link href="/dashboard/customer">
            <ArrowBack
              sx={{
                fill: theme.palette.common.white,
              }}
            />
          </Link>
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.common.white,
              mb: 2,
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            Delivery Details
          </Typography>
        </Stack>
      </Box>

      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Company: </span>
        {selectedDelivery.company}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Items Delivered: </span>
        {selectedDelivery.itemsDelivered}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Delivered: </span>
        {selectedDelivery.delivered ? 'Yes' : 'No'}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Delivery Time: </span>
        {selectedDelivery.deliveryTime}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Completed: </span>
        {selectedDelivery.completed ? 'Yes' : 'No'}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Remark: </span>
        {selectedDelivery.remark}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Status Color: </span>
        {selectedDelivery.statusColor}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Archived: </span>
        {selectedDelivery.archived ? 'Yes' : 'No'}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Customer: </span>
        {selectedDelivery.customer}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Address: </span>
        {selectedDelivery.address}
      </Typography>

      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>
          Sales Delivery Status:{' '}
        </span>
        {selectedDelivery.salesDeliveryStatus}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Sales Delivery Type: </span>
        {selectedDelivery.salesDeliveryType}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Sales Order: </span>
        {selectedDelivery.salesOrder}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Delivery Agent: </span>
        {selectedDelivery.deliveryAgent}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Delivery Amount: </span>
        {selectedDelivery.deliveryAmount}
      </Typography>
      <Divider />
      <Box pr={'30px'}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            fontSize: '20px',

            my: '20px',
            border: '2px',
            borderBottomStyle: 'dotted',
            pb: '4px',
            borderBottomColor: theme.palette.text.disabled,
          }}
        >
          Delivery Items
        </Typography>
        {selectedDelivery.items &&
          selectedDelivery.items.map((item) =>
            renderDeliveryItem(item)
          )}
      </Box>
      {selectedDelivery.salesDeliveryStatus !== 'Completed' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
            mt: { md: '20px' },
            width: '100%',
            mb: '30px',
          }}
        >
          {confirmity && (
            <Box width={'40%'} mr="10px">
              <FormControl>
                <OutlinedInput
                  type="text"
                  placeholder="Enter Valid Pin"
                  sx={{
                    height: '40px',
                    mb: '10px',
                  }}
                />
                <Box
                  sx={{
                    width: '40%',
                    mr: 0,
                  }}
                >
                  <Button
                    onClick={handleSubmit}
                    variant={'contained'}
                    color={'primary'}
                  >
                    Submit
                  </Button>
                </Box>
              </FormControl>
            </Box>
          )}
          {!confirmity && (
            <Box
              sx={{
                height: '40px',
                mt: '10px',
                mr: '10px',
              }}
            >
              <Button
                onClick={() => {
                  setConfirm(!confirmity);
                }}
                variant={'contained'}
                color={'secondary'}
              >
                Confirm
              </Button>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.palette.common.black,
                color: theme.palette.common.white,
                mt: 2,
              }}
            >
              Track Order
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default DeliveryDetailsPage;
