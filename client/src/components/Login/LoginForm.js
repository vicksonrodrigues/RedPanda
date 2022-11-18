import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const LoginForm = () => (
  <Box>
    <Typography textAlign="center" variant="h2" sx={{ width: '100%', fontWeight: 'medium', p: 6 }}>
      Login
    </Typography>
    <Box p={2}>
      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Email/Phone Number
        </Typography>
        <TextField placeholder="Email Id or Phone Number" fullWidth />
      </Box>
      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Password
        </Typography>
        <TextField placeholder="Password" fullWidth />
      </Box>
      <Box>
        <Button size="small">
          <Typography mb={1} mt={1} variant="subtitle2">
            Forget Password ?
          </Typography>
        </Button>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" fullWidth>
          <Typography>Submit</Typography>
        </Button>
      </Box>
    </Box>
  </Box>
);

export default LoginForm;
