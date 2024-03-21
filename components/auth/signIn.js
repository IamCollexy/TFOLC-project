import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  OutlinedInput,
  Typography,
  Container,
  Stack,
  Box,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import * as Yup from 'yup';
import { AlertNotification } from '../alert/AlertNotifiction';
import { useRouter } from 'next/navigation'; // Change import from next/navigation to next/router
import { responseHandler } from '@/src/utils/apiResponseHandler';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSendDataMutation } from '@/store/slices/requestSlice';
import { useDispatch } from 'react-redux';
import { setIsAuth } from '@/store/slices/isAuthSlice';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'), // Fix email validation
  password: Yup.string().required('Password is required'),
});

const LoginForm = ({ onSubmit }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    type: '',
    message: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userAuth, { isLoading, reset }] = useSendDataMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { resetForm }) => {
      setShowNotification(false);
      const response = await userAuth({
        url: 'auth',
        data: {
          email: values.email,
          password: values.password,
        },
        type: 'POST',
      });

      // handle response
      const responseData = responseHandler(response);
      if (responseData && responseData.type === 'success') {
        dispatch(
          setIsAuth({
            isAuth: true,
            accessToken: responseData?.data?.accessToken,
          })
        );
        router.push('/');
      } else {
        setNotificationData(responseData);
        setShowNotification(true);
      }
      resetForm();
    },
  });

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        minHeight: '100vh',
      }}
    >
      <Container
        component="form"
        onSubmit={formik.handleSubmit}
        maxWidth="sm"
        sx={{
          height: '75vh',
          width: { xs: '90%', md: '500px' },
          margin: '50px auto',
          backgroundColor: '#fff',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          pt: 6,
          borderRadius: 4,
          position: 'relative',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          {showNotification && (
            <AlertNotification
              type={notificationData.type}
              message={notificationData.message}
            />
          )}
          <Typography
            variant="body1"
            position={'relative'}
            textAlign={'center'}
            color="gray"
          >
            Login to continue
          </Typography>
          <OutlinedInput
            name="email"
            variant="outlined"
            margin="normal"
            placeholder="Enter email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              formik.touched.email && Boolean(formik.errors.email)
            }
          />
          <Typography color="error">
            {formik.touched.email && formik.errors.email}
          </Typography>
          <OutlinedInput
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            placeholder="Password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            error={
              formik.touched.password &&
              Boolean(formik.errors.password)
            }
          />
          <Typography color="error">
            {formik.touched.password && formik.errors.password}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              color: 'red',
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <Typography variant="body1">Forgot Password</Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              padding: '10px',
              color: '#fff',
            }}
          >
            {isLoading ? <CircularProgress size={14} /> : ' Login'}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginForm;
