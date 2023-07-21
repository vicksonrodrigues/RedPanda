import { Box, Card, CardActionArea, CardContent, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useGetCustomerQuery } from '../../features/customer/customerApiSlice';

const PersonalDetails = ({ customer }) => {
  const { data: customerDetails } = useGetCustomerQuery(customer?.id, {
    skip: !customer,
  });
  return (
    <Box margin={2}>
      {!customer ? (
        <Card>
          <CardActionArea
            disabled={!customer}
            sx={{
              '&.Mui-disabled': {
                cursor: 'not-allowed',
                pointerEvents: 'auto',
                color: 'rgba(0, 0, 0, 0.26)',
                boxShadow: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <CardContent>
              <Typography variant="button">Personal Details</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Stack spacing={2}>
          <Typography variant="h5">Personal Details</Typography>
          <Box border={1} p={1} borderColor="divider" borderRadius={2}>
            <Card>
              <CardContent>
                <Stack mb={1}>
                  <Typography variant="button">Name</Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.disabled"
                  >{`${customerDetails?.firstName} ${customerDetails?.lastName}`}</Typography>
                </Stack>
                <Divider />
                <Stack mt={1}>
                  <Typography variant="button">Contact Number</Typography>
                  <Typography variant="subtitle1" color="text.disabled">
                    {customerDetails?.phone}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default PersonalDetails;
