import { Box, Typography, Paper, Alert, Stack, Pagination, Grid } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';

import ProfileSubHeader from '../../components/ProfileSubHeader';
import { useGetCustomerQuery } from '../../features/customer/customerApiSlice';

const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(localizedFormat);

const Reserve = ({ reservation }) => (
  <Grid
    item
    component={Paper}
    mb={2}
    p={2}
    position="relative"
    elevation={10}
    borderRadius={5}
    width="100%"
    height="100%"
  >
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
      <Typography variant="subtitle1">{reservation?.tag}</Typography>
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
          <Typography>
            Name: {reservation?.firstName} {reservation?.lastName}
          </Typography>
          <Typography>Contact: {reservation?.phone} </Typography>
          <Typography>Email: {reservation?.email}</Typography>
        </Stack>
      </Box>
      <Box>
        <Typography variant="body2" color="#ababab" sx={{ textTransform: 'uppercase', my: 1 }}>
          Reserved On
        </Typography>
        <Stack spacing={1}>
          <Typography>
            Date: {dayjs(`${reservation?.reserveTimestamp}`).format('LL')} at{' '}
            {dayjs(`${reservation?.reserveTimestamp}`).format('LT')}
          </Typography>
          <Typography>Guests: {reservation?.guests} </Typography>
        </Stack>
      </Box>
    </Stack>
  </Grid>
);

const Bookings = ({ value, index, customerAuth }) => {
  const { upcomingReservation, pastReservation } = useGetCustomerQuery(customerAuth?.id, {
    selectFromResult: ({ data, isSuccess }) => ({
      upcomingReservation: data?.reservations?.filter(
        (reservation) => reservation.tag === 'Received' || reservation.tag === 'Confirmed',
      ),
      pastReservation: data?.reservations?.filter(
        (reservation) => reservation.tag === 'Completed' || reservation.tag === 'Cancelled',
      ),
      data,
      isSuccess,
    }),
  });

  const itemsPerPage = 3;
  const [page, setPage] = React.useState(1);
  const noOfPages = Math.ceil(10 / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && (
        <ProfileSubHeader title="Reservations">
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
            <Grid container direction="column" alignItems="center" justifyContent="space-around">
              {upcomingReservation.length > 0 ? (
                upcomingReservation.map((reservation) => (
                  <Reserve key={reservation.id} reservation={reservation} />
                ))
              ) : (
                <Grid item component={Paper} p={2} variant="outlined" width={1}>
                  <Typography>No Reservation here</Typography>
                </Grid>
              )}
            </Grid>
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
            {pastReservation.length > 0 ? (
              <div>
                <Stack
                  component={Paper}
                  p={2}
                  spacing={2}
                  variant="outlined"
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  {pastReservation
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((reservation) => (
                      <Reserve key={reservation.id} reservation={reservation} />
                    ))}
                </Stack>
                <Box display="flex" justifyContent="flex-end" p={2}>
                  <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={handleChange}
                    defaultPage={1}
                    color="primary"
                    size="small"
                    showFirstButton
                    showLastButton
                  />
                </Box>
              </div>
            ) : (
              <Box component={Paper} p={2} variant="outlined">
                <Typography>No Orders here</Typography>
              </Box>
            )}
          </Box>
        </ProfileSubHeader>
      )}
    </div>
  );
};

export default Bookings;
