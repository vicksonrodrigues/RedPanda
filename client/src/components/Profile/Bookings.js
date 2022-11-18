import { Box, Typography, Paper, Alert, Stack } from '@mui/material';
import React from 'react';

const Reserve = () => (
  <Box component={Paper} p={2} position="relative" elevation={6}>
    <Alert
      severity="success"
      icon={false}
      sx={{
        position: 'absolute',
        inset: '10px 10px auto auto',
        p: 0,
        px: 1,
        display: 'inline-flex',
      }}
    >
      <Typography variant="subtitle1">Confirmed</Typography>
    </Alert>
    <Typography
      variant="h6"
      borderBottom={1}
      borderColor="divider"
      marginBottom={1}
      width="75%"
      sx={{ textTransform: 'uppercase' }}
    >
      Reservation Details
    </Typography>
    <Stack direction="row" spacing={5}>
      <Box>
        <Typography variant="body2" color="#ababab" sx={{ textTransform: 'uppercase', my: 1 }}>
          Reserved by
        </Typography>
        <Stack spacing={1}>
          <Typography>Name: Vickson Rodrigues</Typography>
          <Typography>Contact: 123456789 </Typography>
          <Typography>Email: abc@redPanda.com</Typography>
        </Stack>
      </Box>
      <Box>
        <Typography variant="body2" color="#ababab" sx={{ textTransform: 'uppercase', my: 1 }}>
          Reserved for
        </Typography>
        <Stack spacing={1}>
          <Typography>Date : September, 04 2018 21:30 PM</Typography>
          <Typography>Guests: 8 </Typography>
          <Typography>Location: Kharghar</Typography>
        </Stack>
      </Box>
    </Stack>
  </Box>
);

const Bookings = ({ value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
    {value === index && (
      <Box component={Paper} sx={{ m: 3, p: 3 }} border={1} borderColor="divider">
        <Box
          display="flex"
          justifyContent="flex-start"
          my={3}
          pb={1}
          borderBottom={1}
          borderColor="divider"
        >
          <Typography variant="h4">Reservation</Typography>
        </Box>
        <Box>
          <Box
            display="flex"
            my={3}
            p={1}
            sx={{
              justifyContent: 'space-between',
              backgroundImage: 'linear-gradient(to top, rgb(168,118,62,0), rgb(168,118,62,1))',
            }}
          >
            <Typography variant="h5">Upcoming </Typography>
          </Box>
          <Reserve />
        </Box>
        <Box>
          <Box
            display="flex"
            my={3}
            p={1}
            sx={{
              justifyContent: 'space-between',
              backgroundImage: 'linear-gradient(to top, rgb(168,118,62,0), rgb(168,118,62,1))',
            }}
          >
            <Typography variant="h5">Past</Typography>
          </Box>
          <Reserve />
        </Box>
      </Box>
    )}
  </div>
);

export default Bookings;
