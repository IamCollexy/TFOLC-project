import React from 'react';
import {
  TableRow,
  Stack,
  TableCell,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/system';
import Link from 'next/link';
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DeliveryList = ({ order, assign }) => {
  const theme = useTheme();

  return (
    <TableRow key={order.id}>
      <TableCell>{order.id}</TableCell>
      <TableCell>{order.customer}</TableCell>
      <TableCell>{order.salesDeliveryStatus}</TableCell>
      <TableCell>
        <Stack
          direction={'row'}
          spacing={2}
          sx={{
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          {order.salesDeliveryStatus === 'un-assigned' && (
            <IconButton
              onClick={() => {
                assign(order);
              }}
              sx={{
                bgcolor: theme.palette.secondary.main,
                height: '30px',
                width: '30px',
              }}
            >
              <CheckIcon
                sx={{
                  fill: theme.palette.common.white,
                  fontSize: 'small',
                }}
              />
            </IconButton>
          )}
          <Link
            href={{
              pathname: `/dashboard/admin/${order.id}`,
              query: { id: order.id },
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
      </TableCell>
    </TableRow>
  );
};

export default DeliveryList;
