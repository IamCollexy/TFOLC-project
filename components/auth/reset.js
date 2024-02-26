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

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ResetPasswordForm = () => {
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
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      setShowNotification(false);
      router.push('/auth');
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
          minHeight: '65vh',
          width: { xs: '90%', md: '500px' },
          margin: 'auto',
          backgroundColor: theme.palette.common.white,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          py: 6,
          borderRadius: 4,
          mb: '100px',
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4" align="center" gutterBottom>
            Reset Password
          </Typography>
          <Typography
            variant="body1"
            position={'relative'}
            textAlign={'center'}
            color={theme.palette.text.disabled}
          >
            Reset your password
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
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            placeholder="new password"
            fullWidth
            value={formik.values.newPassword}
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
              formik.touched.newPassword &&
              Boolean(formik.errors.newPassword)
            }
          />
          <Typography color="error">
            {formik.errors.newPassword}
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
            {isLoading ? (
              <CircularProgress size={14} />
            ) : (
              'Reset Password'
            )}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default ResetPasswordForm;
