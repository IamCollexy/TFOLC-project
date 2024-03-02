'use client';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <Box
      sx={{
        m: '50px ',
      }}
    >
      <Typography variant="h4">USERS</Typography>
      <Box
        sx={{
          my: '20px',
        }}
      >
        <Typography variant="h6">
          <b>Admin:</b>
        </Typography>
        <Typography variant="body2">Username: Admin</Typography>
        <Typography variant="body2">
          Password: Whatever you want
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6">
          <b>Agent:</b>
        </Typography>
        <Typography variant="body2">Username: Agent</Typography>
        <Typography variant="body2">
          Password: Whatever you want
        </Typography>
      </Box>
      <Box
        sx={{
          my: '20px',
        }}
      >
        <Typography variant="h6">
          <b>Customer:</b>
        </Typography>
        <Typography variant="body2">Username: Customer</Typography>
        <Typography variant="body2">
          Password: Whatever you want
        </Typography>
      </Box>
      <Box
        sx={{
          my: '30px',
        }}
      >
        <Link href="/auth">
          <Button variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default page;
