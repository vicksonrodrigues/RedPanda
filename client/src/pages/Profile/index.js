import {
  Box,
  Grid,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  List,
  Divider,
} from '@mui/material';
import React from 'react';

import Details from './Details';
import Addresses from './Addresses';
import ChangePassword from './ChangePassword';
import OrderHistory from './OrderHistory';
import Bookings from './Bookings';
import PageHeader from '../../components/PageHeader';
// import { useGetCustomerQuery } from '../../features/customer/customerApiSlice';
import useTitle from '../../hooks/useTitle';

const CustomTab = ({ value, handleListItemClick, tabNo, tabName }) => (
  <ListItemButton
    selected={value === tabNo}
    onClick={(event) => handleListItemClick(event, tabNo)}
    sx={{
      '&.Mui-selected': {
        backgroundImage: 'linear-gradient(to left, rgb(168,118,62,0), rgb(168,118,62,1))',
        borderLeft: 2,
        borderColor: 'rgb(93,77,65)',
      },
    }}
  >
    <ListItemText primary={tabName} primaryTypographyProps={{ textAlign: 'center' }} />
  </ListItemButton>
);

const Profile = () => {
  useTitle('RedPanda - Profile');
  // eslint-disable-next-line no-unused-vars
  /* const { data: currentCustomer, isLoading, isSuccess, isError, error } = useGetCustomerQuery();
  console.log('Customer', currentCustomer); */

  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState(1);

  const handleListItemClick = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <PageHeader pageName="Profile">
      <Box m={1}>
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={3}>
            <Box p={2}>
              <Box component={Paper} variant="outlined" my={1}>
                <Typography
                  textAlign="center"
                  p={1}
                  mb={1}
                  sx={{ letterSpacing: 4 }}
                  border={1}
                  borderColor="secondary.main"
                  color="secondary.main"
                  bgcolor="neutral.main"
                >
                  Account Details
                </Typography>
                <Box>
                  <List component="nav">
                    <CustomTab
                      value={value}
                      handleListItemClick={handleListItemClick}
                      tabNo={1}
                      tabName="Your Details"
                    />
                    <Divider />
                    <CustomTab
                      value={value}
                      handleListItemClick={handleListItemClick}
                      tabNo={2}
                      tabName="Change Password"
                    />
                  </List>
                </Box>
              </Box>
              <Box component={Paper} variant="outlined" my={1}>
                <Typography
                  textAlign="center"
                  p={1}
                  mb={1}
                  sx={{ letterSpacing: 4 }}
                  border={1}
                  borderColor="secondary.main"
                  color="secondary.main"
                  bgcolor="neutral.main"
                >
                  Online Order
                </Typography>
                <Box>
                  <List component="nav">
                    <CustomTab
                      value={value}
                      handleListItemClick={handleListItemClick}
                      tabNo={3}
                      tabName="Order Histroy"
                    />
                    <Divider />
                    <CustomTab
                      value={value}
                      handleListItemClick={handleListItemClick}
                      tabNo={4}
                      tabName="My Addresses"
                    />
                  </List>
                </Box>
              </Box>
              <Box component={Paper} variant="outlined" my={1}>
                <Typography
                  textAlign="center"
                  p={1}
                  mb={1}
                  sx={{ letterSpacing: 4 }}
                  border={1}
                  borderColor="secondary.main"
                  color="secondary.main"
                  bgcolor="neutral.main"
                >
                  Reservation
                </Typography>
                <Box>
                  <List component="nav">
                    <CustomTab
                      value={value}
                      handleListItemClick={handleListItemClick}
                      tabNo={5}
                      tabName="Your Reservation"
                    />
                  </List>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Details tabValue={value} index={1} />
            <ChangePassword value={value} index={2} />
            <OrderHistory value={value} index={3} />
            <Addresses value={value} index={4} />
            <Bookings value={value} index={5} />
          </Grid>
        </Grid>
      </Box>
    </PageHeader>
  );
};

export default Profile;
