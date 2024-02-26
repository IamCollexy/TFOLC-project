'use client';

import { clearUser } from '@/store/slices/userSlice';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/auth');
  };

  return (
    <div
      style={{
        marginLeft: '50px',
      }}
    >
      <Button variant="contained" onClick={handleLogout}>
        LogOut
      </Button>
    </div>
  );
};

export default page;
