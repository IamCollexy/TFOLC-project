import DeliveryDashboard from '@/components/dashboard/delivery/deliveryPage';
import { Box } from '@mui/material';
import React from 'react';

const page = () => {
  return (
    <Box
      sx={{
        width: '95%',
        m: '10px auto',
      }}
    >
      <DeliveryDashboard />
    </Box>
  );
};

export default page;
