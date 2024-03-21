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
} from '@mui/material';
import * as Yup from 'yup';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { AlertNotification } from '../alert/AlertNotifiction';
import { useRouter } from 'next/navigation';
import { responseHandler } from '@/src/utils/apiResponseHandler';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSendDataMutation } from '@/store/slices/requestSlice';
import { demoUser } from '@/src/demoUser/demoUser';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
const LoginSchema = Yup.object().shape({
  name: Yup.string().required('username is required'),
  password: Yup.string().required('Password is required'),
  // .min(8, 'Password must be at least 8 characters'),
});

const LoginForm = ({ onSubmit }) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    type: '',
    message: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userAuth, { isLoading, reset }] = useSendDataMutation();
  const [type, setType] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: LoginSchema,

    onSubmit: async (values, { resetForm }) => {
      setShowNotification(false);
      const foundUser = demoUser.find(
        (user) => user.name === values.name
      );

      if (foundUser) {
        setType('success');
        if (
          foundUser.role === 'Agent' ||
          foundUser.role === 'Customer' ||
          foundUser.role === 'Admin'
        ) {
          dispatch(setUser(foundUser));
          const redirectTo =
            foundUser.role === 'Admin'
              ? '/dashboard/admin'
              : foundUser.role === 'Agent'
              ? '/dashboard'
              : foundUser.role === 'Customer'
              ? '/dashboard/customer'
              : '/auth';
          router.push(redirectTo);
        } else {
          setType('error');

          console.error('Invalid user role:', foundUser.role);
          // Handle the case when the user role is not recognized
        }
      } else {
        setType('error');

        console.error('User not found.');
        // Handle the case when no user is found
      }
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
        backgroundColor: theme.palette.common.white,
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          ml: '20px',
          pt: '10px',
          mb: '30px',
          display: 'flex',
          justifyContent: { xs: 'center', md: 'start' },
        }}
      >
        <Box>
          <Image
            src={'/myishpos_logos.png'}
            alt="delivery Icon"
            width={150}
            height={100}
            onClick={() => router.push('/')}
          />
        </Box>
      </Box>
      <Container
        component="form"
        onSubmit={formik.handleSubmit}
        maxWidth="sm"
        sx={{
          // height: type !== '' ? '90vh' : '60vh',
          height: '75vh',
          width: { xs: '90%', md: '500px' },
          margin: 'auto',
          backgroundColor: theme.palette.common.white,
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
          {type !== '' && (
            <AlertNotification
              type={type}
              message={
                type === 'success'
                  ? 'Thanks'
                  : type === 'error'
                  ? 'no records found'
                  : ''
              }
            />
          )}
          <Typography
            variant="body1"
            position={'relative'}
            textAlign={'center'}
            color={theme.palette.text.disabled}
          >
            Login to continue
            <i
              style={{
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                height: '35px',
                width: '40px',
              }}
            >
              <Image
                src={'/delivery.png'}
                alt="delivery Icon"
                width={35}
                height={35}
              />
            </i>
          </Typography>
          <OutlinedInput
            name="name"
            variant="outlined"
            margin="normal"
            placeholder="enter username"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
          />
          <Typography color="error">{formik.errors.name}</Typography>
          <OutlinedInput
            name="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            placeholder="password"
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
                  {showPassword ? (
                    <VisibilityOff
                      sx={{ fill: theme.palette.text.disabled }}
                    />
                  ) : (
                    <Visibility
                      sx={{ fill: theme.palette.text.disabled }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            }
            error={
              formik.touched.password &&
              Boolean(formik.errors.password)
            }
          />
          <Typography color="error">
            {formik.errors.password}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              color: 'red',
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/auth/forgot')}
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
              color: theme.palette.common.white,
            }}
            // disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={14} /> : ' Login'}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginForm;
