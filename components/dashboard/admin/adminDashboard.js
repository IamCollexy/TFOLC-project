'use client';
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Box,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateSalesDelivery } from '@/store/slices/deliverySlice';
import { useRouter } from 'next/navigation';
import {
  updateLocation,
  updateState,
} from '@/store/slices/userSlice';
import axios from 'axios';
import { useTheme } from '@mui/system';
import DeliveryList from './deliveryList';
import SearchBar from '@/components/search/search';

const AdminDashboard = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const orders = useSelector((state) => state.delivery);
  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [updatedSalesDeliveries, setUpdatedSalesDeliveries] =
    useState([]);
  // Dummy list of delivery companies
  const [deliveryCompanies] = useState([
    { id: 1, name: 'MyIshops Logistics' },
    { id: 2, name: 'Baka Rides' },
    { id: 3, name: 'Magito' },
  ]);

  useEffect(() => {
    if (user.role !== 'Admin') {
      router.replace('/auth');
    }
    console.log(user);
  }, [user]);

  useEffect(() => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      dispatch(
        updateLocation({ longitude: longitude, latitude: latitude })
      );
      const apiKey = '55346314d85095238defdeee438085aa';

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      axios
        .get(weatherUrl)
        .then((response) => {
          dispatch(updateState({ userState: response.data.name }));
        })
        .catch((error) => {
          console.error('Error fetching location:', error);
        });
    }

    function error(error) {
      console.error('Geolocation error:', error);
      setError('Geolocation error');
    }

    // Get the user's location
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const handleAssignDelivery = (order) => {
    setSelectedOrder(order);
  };

  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  const handleCloseDialog = () => {
    setSelectedOrder(null);
    setSelectedCompany('');
  };

  const handleConfirmAssign = () => {
    // Here you would send an API request to assign the selected company to the selected order
    // Then update the order status in the state or fetch the updated list of orders from the server
    // For simplicity, we'll just update the local state here

    dispatch(
      updateSalesDelivery({
        id: selectedOrder?.id,
        company: selectedCompany,
      })
    );
    handleCloseDialog();
  };

  useEffect(() => {
    setUpdatedSalesDeliveries(orders);
    console.log(orders);
  }, [orders]);

  return (
    <Container
      sx={{
        //         color: theme.palette.gray.darker,
        mb: '50px',
      }}
    >
      <SearchBar />
      <Box
        sx={{
          backgroundImage: `url('/redBg.jpg')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start',
          width: '95%',
          m: '20px auto',
          color: theme.palette.common.white,
          p: 2,
          borderRadius: '3px',
          height: '110px',
        }}
      >
        <Stack spacing={1}>
          <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>
            {user.name}
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            {`Total Earnings: $${65}`}
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            {`Location: ${user.state}`}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography sx={{ fontSize: '14px' }}>
            {`Rating: 4`}
          </Typography>
          <Typography sx={{ fontSize: '14px' }}>
            {`Trips: ${25}`}
          </Typography>
        </Stack>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Status</TableCell>
            <TableCell
              sx={{
                justifyContent: 'center',
                display: 'flex',
              }}
            >
              Assign
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {updatedSalesDeliveries.map((order) => (
            <DeliveryList
              order={order}
              assign={handleAssignDelivery}
            />
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={Boolean(selectedOrder)}
        onClose={handleCloseDialog}
      >
        <Box
          sx={{
            width: '300px',
          }}
        >
          <DialogTitle>Assign Delivery</DialogTitle>
          <DialogContent>
            <TextField
              select
              label="Select Company"
              value={selectedCompany}
              onChange={handleCompanyChange}
              fullWidth
            >
              {deliveryCompanies.map((company) => (
                <MenuItem key={company.id} value={company.name}>
                  {company.name}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleConfirmAssign}>Confirm</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
