import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { useDispatch } from 'react-redux';
// import { useAddNewAddressMutation } from '../../features/customer/customerApiSlice';
// import { setNotification } from '../../features/notification/notificationSlice';
import AddressDialog from '../../components/AddressDialog';
import { useGetCustomerQuery } from '../../features/customer/customerApiSlice';

const DeliveryAddress = ({ customer, setDeliveryAddress }) => {
  const { customerAddresses } = useGetCustomerQuery(customer?.id, {
    selectFromResult: ({ data }) => ({
      customerAddresses: data?.addresses,
    }),
    skip: !customer,
    refetchOnMountOrArgChange: true,
  });

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const handleSelection = (event, newFormats) => {
    if (customerAddresses.length > 1) setSelected(newFormats);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (customerAddresses) {
      const completeAddress = customerAddresses[selected]?.addressLine1.concat(
        ',',
        customerAddresses[selected]?.addressLine2,
        '.Landmark-',
        customerAddresses[selected]?.landmark,
      );
      setDeliveryAddress(completeAddress);
    }
  }, [selected]);
  return (
    customerAddresses && (
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
                <Typography variant="button">Delivery Address</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ) : (
          <Stack spacing={2}>
            <Typography variant="h5">Delivery Address</Typography>
            <Box border={1} p={1} borderColor="divider" borderRadius={2}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Box>
                      {customerAddresses?.length !== 0 ? (
                        <Card variant="outlined">
                          <CardContent sx={{ display: 'flex' }}>
                            <Typography variant="button" pr={1}>
                              Address:
                            </Typography>
                            <Typography>
                              {customerAddresses[selected]?.addressLine1.concat(
                                ',',
                                customerAddresses[selected]?.addressLine2,
                                ',',
                                customerAddresses[selected]?.zip,
                              )}
                            </Typography>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card>
                          <CardActionArea onClick={handleClickOpen}>
                            <CardContent
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                flexDirection: 'column',
                              }}
                            >
                              <AddCircleOutlineIcon />
                              <Typography variant="body2" m={1}>
                                Add Address
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      )}
                    </Box>
                    {customerAddresses?.length !== 0 ? (
                      <Box>
                        <Typography mb={1}>Saved Addresses:</Typography>
                        <ToggleButtonGroup
                          sx={{
                            '& .MuiToggleButtonGroup-grouped': {
                              margin: 1,
                              marginRight: 2,
                              border: 2,
                              '&:not(:first-of-type)': {
                                borderRadius: 4,
                                border: 2,
                              },
                              '&:first-of-type': {
                                borderRadius: 4,
                              },
                            },
                          }}
                          color="secondary"
                          value={selected}
                          onChange={handleSelection}
                          exclusive
                        >
                          {customerAddresses?.map((location, index) => (
                            <ToggleButton value={index} key={location.id}>
                              {location.tag}
                            </ToggleButton>
                          ))}
                        </ToggleButtonGroup>
                      </Box>
                    ) : (
                      <div />
                    )}

                    {customerAddresses?.length !== 0 ? (
                      <Button variant="contained" fullWidth onClick={handleClickOpen}>
                        Add new Address
                      </Button>
                    ) : (
                      <div />
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
            <AddressDialog customerId={customer.id} open={open} setOpen={setOpen} />
          </Stack>
        )}
      </Box>
    )
  );
};

export default DeliveryAddress;
