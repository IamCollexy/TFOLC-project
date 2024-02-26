import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Container,
  Stack,
  Box,
  CircularProgress,
} from '@mui/material';
import * as Yup from 'yup';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { AlertNotification } from '../alert/AlertNotifiction';
import { useRouter } from 'next/navigation';
import { responseHandler } from '@/src/utils/apiResponseHandler';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSendDataMutation } from '@/store/slices/requestSlice';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignupForm = () => {
  const theme = useTheme();
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    type: '',
    message: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const [userAuth, { isLoading, reset }] = useSendDataMutation();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm }) => {
      setShowNotification(false);

      // handle request
      // const request = await userAuth({
      //   url: 'auth/signUp',
      //   data: {
      //     fullName: values.fullName,
      //     email: values.email,
      //     password: values.password,
      //     confirmPassword: values.confirmPassword,
      //   },
      //   type: 'POST',
      // });
      // handle response
      // const response = responseHandler(request);
      // response && setNotificationData(response);
      // response && setShowNotification(true);
      // response &&
      //   response.type === 'success' &&
      router.push('/auth');
      // router.push({
      //   pathname: 'auth',
      //   // query: { email: response.data.user.email },
      // });
      // response && formik.resetForm();

      // scrollToTop();
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
          minHeight: '70vh',
          width: { xs: '90%', md: '500px' },
          backgroundColor: theme.palette.common.white,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          py: 6,
          borderRadius: 4,
          mb: '100px',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
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
            color={theme.palette.text.disabled}
          >
            Let us bring your orders to your door step
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
            name="fullName"
            variant="outlined"
            margin="normal"
            placeholder="Collins Ikpeme"
            fullWidth
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={
              formik.touched.fullName &&
              Boolean(formik.errors.fullName)
            }
          />
          <Typography color="error">
            {formik.errors.fullName}
          </Typography>
          <OutlinedInput
            name="email"
            variant="outlined"
            margin="normal"
            placeholder="collins@email.com"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              formik.touched.email && Boolean(formik.errors.email)
            }
          />
          <Typography color="error">{formik.errors.email}</Typography>

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
          <OutlinedInput
            name="confirmPassword"
            placeholder="Confirm password"
            focused
            type={showPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            sx={{
              color: 'text.disabled',
            }}
          />
          <Typography color="error">
            {formik.errors.confirmPassword}
          </Typography>

          <Typography variant="p" color={theme.palette.text.disabled}>
            Already have an account &nbsp;
            <Typography
              variant="span"
              onClick={() => router.push('/auth')}
              color={'primary.main'}
              sx={{ cursor: 'pointer' }}
            >
              Login
            </Typography>
          </Typography>
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
            {isLoading ? <CircularProgress size={14} /> : ' Sign up'}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default SignupForm;
