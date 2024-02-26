'use client';
import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Divider,
  Button,
  Stack,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import {
  completeDelivery,
  moveToInTransit,
} from '@/store/slices/deliverySlice';

const DeliveryDetailsPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const search = useSearchParams();
  const router = useRouter();
  const id = search.get('id');
  const theme = useTheme();
  const salesDelivery = useSelector((state) => state.delivery);
  const [selectedDelivery, setSelectedDelivery] = useState({});
  const [picked, setPicked] = useState(false);

  useEffect(() => {
    if (user.role !== 'Agent') {
      router.replace('/auth');
    }
  }, [user, router]);
  useEffect(() => {
    const foundDelivery = salesDelivery.find(
      (delivery) => delivery.id == id
    );
    setSelectedDelivery(foundDelivery);
  }, [salesDelivery]);

  const handlePickUp = (id) => {
    dispatch(
      moveToInTransit({
        id: id,
        agentName: user.name,
      })
    );
  };
  const handleComplete = (id) => {
    dispatch(completeDelivery(id));
    router.push('/dashboard');
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
            Quantity To Deliver :{' '}
          </span>
          {item.qtyDelivered}
        </Typography>
        {/* <Typography fontSize={16} mb={1}>
          <span style={{ fontWeight: 600 }}>Unit Price: </span>
          {item.unitPrice}
        </Typography> */}
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
        maxWidth: '600px',
        margin: '10px auto',
        mb: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        minHeight: '100vh',
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
          <Link href="/dashboard">
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
              mb: 4,
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            Delivery Details
          </Typography>
        </Stack>
      </Box>
      {/* {selectedDelivery && (
        <> */}
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Company: </span>
        {selectedDelivery.company}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Items To Deliver: </span>
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
        <span style={{ fontWeight: 600 }}>Company Contact: </span>
        {selectedDelivery.employee}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Delivery Status:</span>
        {selectedDelivery.salesDeliveryStatus}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}>Delivery Type: </span>
        {selectedDelivery.salesDeliveryType}
      </Typography>
      <Typography fontSize={16} mb={1}>
        <span style={{ fontWeight: 600 }}> Order Id: </span>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',

          width: '100%',
          mb: '20px',
        }}
      >
        <Button
          sx={{ mr: '20px' }}
          variant={'contained'}
          color={'primary'}
          onClick={() => {
            setPicked(!picked);
            handlePickUp(selectedDelivery.id);
          }}
          disabled={
            picked === true ||
            selectedDelivery.salesDeliveryStatus === 'In-Transit'
          }
        >
          Pick up
        </Button>
        <Button
          onClick={() => {
            handleComplete(selectedDelivery.id);
          }}
          disabled={
            picked === false &&
            selectedDelivery.salesDeliveryStatus !== 'In-Transit'
          }
          variant={'contained'}
          color={'secondary'}
        >
          Complete
        </Button>
      </Box>
    </Box>
  );
};

export default DeliveryDetailsPage;
