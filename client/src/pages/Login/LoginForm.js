import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, OutlinedInput, Typography } from '@mui/material';
import { Navigate, useNavigate } from 'react-router-dom';
import useField from '../../hooks/useField';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { setCredentials } from '../../features/auth/authSlice';
import { setNotification } from '../../features/notification/notificationSlice';

const LoginForm = () => {
  const [login] = useLoginMutation();
  const user = useSelector((state) => state.user);

  const email = useField('email');
  const password = useField('password');

  const navigate = useNavigate();
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { accessToken } = await login({
        email: email.fields.value,
        password: password.fields.value,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      email.reset();
      password.reset();
      navigate('/');
      notify('Login Successful');
    } catch (err) {
      if (!err.status) {
        notify('No Server Response', 'error');
      } else if (err.status === 400) {
        notify('Missing Username or Password', 'error');
      } else if (err.status === 401) {
        notify('Unauthorized', 'error');
      } else {
        notify(`${err.data?.message}`, 'error');
      }
    }
  };
  const handleReset = (event) => {
    event.preventDefault();
    email.reset();
    password.reset();
    notify('Fields have been Reset', 'info');
  };

  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Box>
      <Typography
        textAlign="center"
        variant="h2"
        sx={{ width: '100%', fontWeight: 'medium', p: 6, color: 'white' }}
      >
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box p={2}>
          <Box>
            <Typography mb={1} mt={1} variant="subtitle2" color="white">
              Email
            </Typography>
            <OutlinedInput
              placeholder="Email Id "
              fullWidth
              type={email.fields.type}
              sx={{
                backgroundColor: 'white',
                color: 'black',
              }}
              value={email.fields.value}
              onChange={email.fields.onChange}
            />
          </Box>
          <Box>
            <Typography mb={1} mt={1} variant="subtitle2" color="white">
              Password
            </Typography>
            <OutlinedInput
              placeholder="Password"
              type={password.fields.type}
              fullWidth
              sx={{
                backgroundColor: 'white',
                color: 'black',
              }}
              value={password.fields.value}
              onChange={password.fields.onChange}
            />
          </Box>
          <Box>
            <Button size="small">
              <Typography mb={1} mt={1} variant="subtitle2" color="white">
                Forget Password ?
              </Typography>
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" py={3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="secondary"
              sx={{ bgcolor: 'secondary.light' }}
            >
              <Typography variant="button" color="black">
                Submit
              </Typography>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ bgcolor: 'secondary.light', mx: 1 }}
              onClick={handleReset}
            >
              <Typography variant="button" color="black">
                Reset
              </Typography>
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default LoginForm;
