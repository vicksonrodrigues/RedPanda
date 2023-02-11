import { Grid } from '@mui/material';
import React from 'react';
import WorkingHours from './WorkingHours';
import ReservationForm from './ReservationForm';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';

const Reservation = () => {
  useTitle('Redpanda - Reservation');
  return (
    <PageHeader pageName="Reservation">
      <Grid container>
        <Grid item xs={8}>
          <ReservationForm />
        </Grid>
        <Grid item xs={4}>
          <WorkingHours />
        </Grid>
      </Grid>
    </PageHeader>
  );
};

export default Reservation;
