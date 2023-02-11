import { Box, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import useTitle from '../../hooks/useTitle';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Login = () => {
  const [form, setForm] = React.useState('Login');
  useTitle(`RedPanda - ${form} `);

  const handleChange = (event, newForm) => {
    if (newForm !== null) {
      setForm(newForm);
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <Box component={Paper} elevation={5} p={4} width="50%" sx={{ bgcolor: 'primary.main' }}>
        <ToggleButtonGroup
          value={form}
          exclusive
          onChange={handleChange}
          sx={{ display: 'flex', width: '100%' }}
          size="large"
          fullWidth
        >
          <ToggleButton
            value="Login"
            sx={{
              borderRadius: '50px',

              border: 2,
              borderColor: 'white',
              p: 1,

              '&.MuiToggleButton-root.Mui-selected': {
                backgroundColor: 'secondary.main',
                '.MuiTypography-root': {
                  color: 'black',
                },
              },
            }}
          >
            <Typography variant="subtitle2" color="white">
              Login
            </Typography>
          </ToggleButton>
          <ToggleButton
            value="SignUp"
            sx={{
              borderRadius: '50px',
              border: 2,
              borderColor: 'white',
              p: 1,

              '&.MuiToggleButton-root.Mui-selected': {
                backgroundColor: 'secondary.main',
                '.MuiTypography-root': {
                  color: 'black',
                },
              },
            }}
          >
            <Typography variant="subtitle2" color="white">
              Sign Up
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        {form === 'Login' ? <LoginForm /> : <SignupForm setForm={setForm} />}
      </Box>
    </Box>
  );
};

export default Login;
