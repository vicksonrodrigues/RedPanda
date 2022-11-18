import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import WorkingHours from './WorkingHours';
import ReservationForm from './ReservationForm';

const Reservation = () => (
  <Box p={2} height="auto">
    <Box display="flex" justifyContent="center" p={2} border={1} bgcolor="primary.light">
      <Typography variant="h4"> Reservation</Typography>
    </Box>
    <Grid container>
      <Grid item xs={8}>
        <ReservationForm />
      </Grid>
      <Grid item xs={4}>
        <WorkingHours />
      </Grid>
    </Grid>
  </Box>
);

export default Reservation;
