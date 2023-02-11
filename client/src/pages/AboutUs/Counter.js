import { Box, Card, CardContent, Grid, SvgIcon, Typography } from '@mui/material';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { ReactComponent as BranchIcon } from '../../assests/Icons/branch1.svg';
import { ReactComponent as ReservationIcon } from '../../assests/Icons/reservation.svg';
import { ReactComponent as TakeoutIcon } from '../../assests/Icons/Delivery2.svg';
import { ReactComponent as RatingIcon } from '../../assests/Icons/rating1.svg';

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
    <CardContent>
      <SvgIcon
        component={icon}
        inheritViewBox
        sx={{ width: 1, height: 120, p: 1, color: 'black' }}
      />
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
    </CardContent>
  </Card>
);

const Counter = () => {
  const [viewPortEntered, setViewPortEntered] = useState(false);
  return (
    <Box display="flex" justifyContent="center" m={3} p={2} height={350} bgcolor="primary.main">
      <VisibilitySensor
        active={!viewPortEntered}
        onChange={(isVisible) => {
          if (isVisible) {
            setViewPortEntered(true);
          }
        }}
        partialVisibility
        offset={{ bottom: 200 }}
      >
        {({ isVisible }) => (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <CounterCard
                isVisible={isVisible}
                icon={BranchIcon}
                count={7}
                duration={10}
                decimals={0}
                cardName="Branch"
              />
            </Grid>
            <Grid item xs={3}>
              <CounterCard
                isVisible={isVisible}
                icon={ReservationIcon}
                count={1956}
                duration={5}
                decimals={0}
                cardName="Reservations"
              />
            </Grid>
            <Grid item xs={3}>
              <CounterCard
                isVisible={isVisible}
                icon={TakeoutIcon}
                count={2653}
                duration={5}
                decimals={0}
                cardName="Home Delivery"
              />
            </Grid>
            <Grid item xs={3}>
              <CounterCard
                isVisible={isVisible}
                icon={RatingIcon}
                count={4.5}
                duration={10}
                decimals={1}
                cardName="Avg. Customer Rating"
              />
            </Grid>
          </Grid>
        )}
      </VisibilitySensor>
    </Box>
  );
};

export default Counter;
