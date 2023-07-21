import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import { setNotification } from '../../features/notification/notificationSlice';

const LoginForm = () => {
  const [login] = useLoginMutation();
  // const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();
  const [hidden, setHidden] = useState(true);

  const from = location.state?.pathname || '/';
  const dispatch = useDispatch();
  const notify = (notificationMessage, notificationType, notificationOpen = true) => {
    dispatch(
      setNotification({
        notificationOpen,
        notificationType,
        notificationMessage,
      }),
    );
  };
  const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, action) => {
      try {
        const { accessToken } = await login({
          email: values.email,
          password: values.password,
        }).unwrap();
        dispatch(setCredentials({ accessToken }));
        action.resetForm();
        navigate(from, { state: location.state.state });
        notify('Login successful! Welcome back!', 'success');
      } catch (err) {
        if (!err.status) {
          notify('No Server Response', 'error');
        } else if (err.status === 400) {
          notify('Missing Username or Password', 'error');
        } else if (err.status === 404) {
          notify('No User Found: Check your Email or Password', 'error');
        } else {
          notify(`${err.data?.error}`, 'error');
        }
      }
    },
  });

  const handleClickShowPassword = () => {
    setHidden((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography
        textAlign="center"
        variant="h3"
        sx={{ width: '100%', fontWeight: 'medium', color: 'white', pt: 4 }}
      >
        Log in
      </Typography>
      <Typography
        textAlign="center"
        variant="subtitle1"
        sx={{ width: '100%', fontWeight: 'medium', color: 'secondary.light', pt: 2, pb: 4 }}
      >
        {`Welcome back you've been missed!`}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container direction="column" px={2} spacing={1}>
          <Grid item>
            <TextField
              required
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email ? formik.errors.email : ' '}
              label="Email"
              variant="filled"
              fullWidth
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              InputLabelProps={{ style: { color: 'black' } }}
              sx={{
                color: 'black',
                input: { backgroundColor: 'white', color: 'black' },
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              id="password"
              name="password"
              type={hidden ? 'password' : 'text'}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password && formik.errors.password ? formik.errors.password : ' '
              }
              label="Password"
              variant="filled"
              fullWidth
              InputLabelProps={{ style: { color: 'black' } }}
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              sx={{
                color: 'black',
                input: { backgroundColor: 'white', color: 'black' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ margin: '0px', height: '100%' }}>
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      sx={{ height: '100%' }}
                    >
                      {hidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { padding: '0px' },
              }}
            />
            <Button
              size="small"
              sx={{
                marginY: '5px',
                color: 'white',
                '&:hover': {
                  color: '#3c52b2',
                },
              }}
            >
              Forget Password ?
            </Button>
          </Grid>

          <Grid item display="flex" justifyContent="center" pt={3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="secondary"
              sx={{ bgcolor: 'secondary.light' }}
            >
              <Typography variant="button" color="black">
                Login
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LoginForm;
