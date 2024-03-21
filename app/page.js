'use client';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <Box
      sx={{
        m: '50px ',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2">Welcome!!</Typography>
    </Box>
  );
};

export default page;
