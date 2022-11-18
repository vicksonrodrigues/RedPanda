import { Box, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const Login = () => {
  const [form, setform] = React.useState(0);

  const handleChange = (event, newForm) => {
    if (newForm !== null) {
      setform(newForm);
    }
  };
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py={4}>
      <Box component={Paper} elevation={14} p={4} width="50%">
        <ToggleButtonGroup
          color="secondary"
          value={form}
          exclusive
          onChange={handleChange}
          sx={{ display: 'flex', width: '100%' }}
          size="large"
          fullWidth
        >
          <ToggleButton value={0} color="secondary">
            <Typography variant="subtitle2">Login</Typography>
          </ToggleButton>
          <ToggleButton value={1}>
            <Typography variant="subtitle2">Sign Up</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        {form === 0 ? <LoginForm /> : <SignupForm />}
      </Box>
    </Box>
  );
};

export default Login;
