import { Box, Stack, TextField, Typography, Paper, InputAdornment, Button } from '@mui/material';
import React from 'react';
import LockIcon from '@mui/icons-material/Lock';

const ChangePassword = ({ value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
    {value === index && (
      <Box component={Paper} sx={{ m: 3, p: 3 }} border={1} borderColor="divider">
        <Box
          display="flex"
          borderBottom={1}
          borderColor="divider"
          my={3}
          pb={1}
          sx={{ justifyContent: 'flex-start' }}
        >
          <Typography variant="h4">Change Password</Typography>
        </Box>
        <Box component={Paper} variant="outlined" p={2} sx={{ width: '70%' }}>
          <Stack direction="column" spacing={2} alignItems="flex-start">
            <Typography>Current Password:</Typography>
            <TextField
              placeholder="Password"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack direction="column" spacing={2} alignItems="flex-start" my={2}>
            <Typography>New Password:</Typography>
            <TextField
              placeholder="Password"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack direction="column" spacing={2} alignItems="flex-start" my={2}>
            <Typography>Confirm New Password:</Typography>
            <TextField
              placeholder="Password"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack direction="row" spacing={4} mt={2}>
            <Button variant="contained" sx={{ bgcolor: 'primary.light' }}>
              Confirm
            </Button>
            <Button variant="outlined">Cancel</Button>
          </Stack>
        </Box>
      </Box>
    )}
  </div>
);

export default ChangePassword;
