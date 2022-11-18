import { Box, Card, CardContent, Grid, SvgIcon, Typography } from '@mui/material';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import { ReactComponent as BranchIcon } from '../../assests/Icons/branch1.svg';
import { ReactComponent as ReservationIcon } from '../../assests/Icons/reservation.svg';
import { ReactComponent as TakeoutIcon } from '../../assests/Icons/Delivery2.svg';
import { ReactComponent as RatingIcon } from '../../assests/Icons/rating1.svg';

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
                    component={BranchIcon}
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
                    {isVisible ? <CountUp end={7} useEasing duration={10} /> : 7}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ width: 1, color: 'black' }}
                  >
                    Branches
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
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
                    component={ReservationIcon}
                    inheritViewBox
                    sx={{ width: 1, height: 120, p: 1, color: 'black' }}
                  />
                  <Typography
                    component="div"
                    variant="h3"
                    textAlign="center"
                    fontWeight="bold"
                    color="secondary.light"
                    sx={{ width: 1, py: 3 }}
                  >
                    {isVisible ? <CountUp end={1956} useEasing duration={5} /> : 1956}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ width: 1, color: 'black' }}
                  >
                    Reservations
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
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
                    component={TakeoutIcon}
                    inheritViewBox
                    sx={{ width: 1, height: 120, p: 1, color: 'black' }}
                  />
                  <Typography
                    component="div"
                    variant="h3"
                    textAlign="center"
                    fontWeight="bold"
                    color="secondary.light"
                    sx={{ width: 1, py: 3 }}
                  >
                    {isVisible ? <CountUp end={2653} useEasing duration={5} /> : 2653}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ width: 1, color: 'black' }}
                  >
                    Home Delivery
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
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
                    component={RatingIcon}
                    inheritViewBox
                    sx={{ width: 1, height: 120, p: 1, color: 'black' }}
                  />
                  <Typography
                    component="div"
                    variant="h3"
                    textAlign="center"
                    fontWeight="bold"
                    color="secondary.light"
                    sx={{ width: 1, py: 3 }}
                  >
                    {isVisible ? <CountUp end={4.5} useEasing duration={10} decimals={1} /> : 4.5}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    textAlign="center"
                    sx={{ width: 1, color: 'black' }}
                  >
                    Avg. Customer Rating
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </VisibilitySensor>
    </Box>
  );
};

export default Counter;
