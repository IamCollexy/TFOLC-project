import AdminDashboard from '@/components/dashboard/admin/adminDashboard';
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
      <AdminDashboard />
    </Box>
  );
};

export default page;
