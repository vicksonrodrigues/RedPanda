import { Grid } from '@mui/material';
import React from 'react';
import WorkingHours from './WorkingHours';
import ReservationForm from './ReservationForm';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';
import useAuth from '../../hooks/useAuth';
import { useGetCustomerQuery } from '../../features/customer/customerApiSlice';

const Reservation = () => {
  useTitle('Redpanda - Reservation');
  const customer = useAuth();
  const { data: customerDetails } = useGetCustomerQuery(customer?.id, {
    pollingInterval: 60000,
    skip: !customer,
  });

  return (
    <PageHeader pageName="Reservation">
      <Grid container p={2} spacing={5}>
        <Grid item xs={7}>
          <ReservationForm customerDetails={customerDetails} />
        </Grid>
        <Grid item xs={4}>
          <WorkingHours />
        </Grid>
      </Grid>
    </PageHeader>
  );
};

export default Reservation;
