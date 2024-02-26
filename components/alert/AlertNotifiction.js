import React from 'react';
import Alert from '@mui/material/Alert';

export function AlertNotification({ type, message }) {
  return <Alert severity={type}>{message}</Alert>;
}
