import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

const SignupForm = () => (
  <Box>
    <Typography textAlign="center" variant="h2" sx={{ width: '100%', fontWeight: 'medium', p: 6 }}>
      Sign Up
    </Typography>
    <Box p={2}>
      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Name
        </Typography>
        <TextField placeholder="First Name" sx={{ width: '50%', pr: 1 }} />
        <TextField placeholder="Last Name" sx={{ width: '50%', pl: 1 }} />
      </Box>
      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Phone
        </Typography>
        <TextField placeholder="Phone Number" fullWidth />
      </Box>
      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Email
        </Typography>
        <TextField placeholder="Email" fullWidth />
      </Box>

      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Password
        </Typography>
        <TextField placeholder="Password" fullWidth />
      </Box>
      <Box display="flex" justifyContent="center" mt={2}>
        <Button variant="contained" fullWidth>
          <Typography>Submit</Typography>
        </Button>
      </Box>
    </Box>
  </Box>
);

export default SignupForm;
