import { Box, Card, CardContent, Grid, SvgIcon, Typography } from '@mui/material';
import React from 'react';
import CountUp from 'react-countup';

import { useInView } from 'react-intersection-observer';
import { ReactComponent as BranchIcon } from '../../assests/Icons/branch1.svg';
import { ReactComponent as ReservationIcon } from '../../assests/Icons/reservation.svg';
import { ReactComponent as TakeoutIcon } from '../../assests/Icons/Delivery2.svg';
import { ReactComponent as RatingIcon } from '../../assests/Icons/rating1.svg';
import { useGetOrderLengthQuery } from '../../features/order/orderApiSlice';
import { useGetReservationLengthQuery } from '../../features/reservation/reservationApiSlice';

const CounterCard = ({ isVisible, icon, count, duration, decimals, cardName }) => (
  <Card
    sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'white',
    }}
  >
    <CardContent
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        alignItems: 'center',
        justifyContent: 'space-b',
        width: '100%',
        height: '100%',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="center" width={{ xs: '50%' }}>
        <SvgIcon
          component={icon}
          inheritViewBox
          sx={{ width: 1, height: 120, p: 1, color: 'black' }}
        />
      </Box>
      <Box display="flex" flexDirection="column" width={1}>
        <Typography
          component="div"
          variant="h3"
          textAlign="center"
          fontWeight="bold"
          sx={{ width: 1, py: 3 }}
          color="secondary.light"
        >
          {isVisible ? (
            <CountUp end={count} useEasing duration={duration} decimals={decimals} />
          ) : (
            <div>{count}</div>
          )}
        </Typography>
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          textAlign="center"
          sx={{ width: 1, color: 'black' }}
        >
          {cardName}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const Counter = () => {
  const { data: orderLength } = useGetOrderLengthQuery('orderLength', { pollingInterval: 60000 });
  const { data: reservationLength } = useGetReservationLengthQuery('resLength', {
    pollingInterval: 6000,
  });
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 800px',
  });

  return (
    <Box display="flex" justifyContent="center" p={2} height="100%" bgcolor="primary.main" mb={3}>
      <Grid ref={ref} container direction={{ xs: 'column', sm: 'row' }} spacing={2} height="100%">
        <Grid item sm={3}>
          <CounterCard
            isVisible={inView}
            icon={BranchIcon}
            count={3}
            duration={10}
            decimals={0}
            cardName="Branch"
          />
        </Grid>
        <Grid item sm={3}>
          <CounterCard
            isVisible={inView}
            icon={ReservationIcon}
            count={reservationLength}
            duration={5}
            decimals={0}
            cardName="Reservations"
          />
        </Grid>
        <Grid item sm={3}>
          <CounterCard
            isVisible={inView}
            icon={TakeoutIcon}
            count={orderLength}
            duration={5}
            decimals={0}
            cardName="Home Delivery"
          />
        </Grid>
        <Grid item sm={3}>
          <CounterCard
            isVisible={inView}
            icon={RatingIcon}
            count={4.5}
            duration={10}
            decimals={1}
            cardName="Avg. Customer Rating"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Counter;
