import { Box, Grid, Tab, Tabs, Typography, Paper } from '@mui/material';
import React from 'react';

import Details from './Details';
import Addresses from './Addresses';
import ChangePassword from './ChangePassword';
import OrderHistory from './OrderHistory';
import Bookings from './Bookings';

const Profile = () => {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box p={1}>
      <Box display="flex" justifyContent="center" m={1} p={2} border={1} bgcolor="primary.light">
        <Typography variant="h4"> Profile</Typography>
      </Box>
      <Box m={1}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={3}>
            <Box p={2}>
              <Box component={Paper} variant="outlined" my={1}>
                <Typography
                  textAlign="center"
                  p={1}
                  m={1}
                  sx={{ letterSpacing: 5 }}
                  borderBottom={1}
                  borderColor="divider"
                  color="secondary.main"
                >
                  Account Details
                </Typography>
                <Box>
                  <Tabs
                    orientation="vertical"
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    value={value}
                    onChange={handleChange}
                    sx={{
                      '& button.Mui-selected': {
                        backgroundImage:
                          'linear-gradient(to left, rgb(168,118,62,0), rgb(168,118,62,1))',
                        borderLeft: 2,
                        borderColor: 'rgb(93,77,65)',
                      },
                    }}
                  >
                    <Tab label="Your Details" value={1} />
                    <Tab label="Change password" value={2} />
                  </Tabs>
                </Box>
              </Box>
              <Box component={Paper} variant="outlined" my={1}>
                <Typography
                  textAlign="center"
                  p={1}
                  m={1}
                  sx={{ letterSpacing: 5 }}
                  borderBottom={1}
                  borderColor="divider"
                  color="secondary.main"
                >
                  Online Ordering
                </Typography>
                <Box>
                  <Tabs
                    orientation="vertical"
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    value={value}
                    onChange={handleChange}
                    sx={{
                      '& button.Mui-selected': {
                        backgroundImage:
                          'linear-gradient(to left, rgb(168,118,62,0), rgb(168,118,62,1))',
                        borderLeft: 2,
                        borderColor: 'rgb(93,77,65)',
                      },
                    }}
                  >
                    <Tab label="Order Histroy" value={3} />
                    <Tab label="My Addresses" value={4} />
                  </Tabs>
                </Box>
              </Box>

              <Box component={Paper} variant="outlined" my={1}>
                <Typography
                  textAlign="center"
                  p={1}
                  m={1}
                  sx={{ letterSpacing: 5 }}
                  borderBottom={1}
                  borderColor="divider"
                  color="secondary.main"
                >
                  Reservation
                </Typography>
                <Box>
                  <Tabs
                    orientation="vertical"
                    TabIndicatorProps={{ style: { display: 'none' } }}
                    value={value}
                    onChange={handleChange}
                    sx={{
                      '& button.Mui-selected': {
                        backgroundImage:
                          'linear-gradient(to left, rgb(168,118,62,0), rgb(168,118,62,1))',
                        borderLeft: 2,
                        borderColor: 'rgb(93,77,65)',
                      },
                    }}
                  >
                    <Tab label="Your Reservation" value={5} />
                  </Tabs>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Details value={value} index={1} />
            <ChangePassword value={value} index={2} />
            <OrderHistory value={value} index={3} />
            <Addresses value={value} index={4} />
            <Bookings value={value} index={5} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
