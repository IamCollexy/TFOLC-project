import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  TextField,
  Typography,
  Container,
  Stack,
  Box,
  OutlinedInput,
} from '@mui/material';
import * as Yup from 'yup';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSendDataMutation } from '@/store/slices/requestSlice';
import { responseHandler } from '@/src/utils/apiResponseHandler';
import { useTheme } from '@mui/material/styles';
import { AlertNotification } from '../alert/AlertNotifiction';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

const ForgotPasswordForm = () => {
  const theme = useTheme();
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    type: '',
    message: '',
  });

  const [userAuth, { isLoading, reset }] = useSendDataMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      setShowNotification(false);
      router.push('/auth/reset');
    },
  });
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.common.white,
        height: '100vh',
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
          height: '65vh',
          width: { xs: '90%', md: '500px' },
          margin: 'auto',
          backgroundColor: theme.palette.common.white,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          pt: 6,
          borderRadius: 4,
          position: 'relative',
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h4" align="center" gutterBottom>
            Forgot Password
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
            Forgot you password? Don't Panic
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
              'Send Reset Email'
            )}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};
export default ForgotPasswordForm;
