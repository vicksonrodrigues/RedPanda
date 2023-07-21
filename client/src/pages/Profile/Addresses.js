/* eslint-disable no-underscore-dangle */
import {
  Typography,
  CardContent,
  Card,
  Grid,
  CardActions,
  Button,
  CardActionArea,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import ProfileSubHeader from '../../components/ProfileSubHeader';
import AddressDialog from '../../components/AddressDialog';
import {
  useDeleteAddressMutation,
  useGetCustomerQuery,
} from '../../features/customer/customerApiSlice';
import { setNotification } from '../../features/notification/notificationSlice';
import EditAddressDialog from '../../components/EditAddressDialog';

const Addresses = ({ value, index, customerAuth }) => {
  const { customerAddresses } = useGetCustomerQuery(customerAuth?.id, {
    selectFromResult: ({ data }) => ({
      customerAddresses: data?.addresses,
    }),
    skip: !customerAuth,
    refetchOnMountOrArgChange: true,
  });

  const [deleteAddress, { isLoading, isSuccess }] = useDeleteAddressMutation();

  const dispatch = useDispatch();
  const notify = (notificationMessage, notificationType, notificationOpen = true) => {
    dispatch(
      setNotification({
        notificationOpen,
        notificationType,
        notificationMessage,
      }),
    );
  };
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleDelete = async (id) => {
    if (!isLoading) {
      try {
        await deleteAddress({ id: customerAuth.id, addressId: id });
      } catch (err) {
        notify(`${err.data?.error}`);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      notify('Address Successfully deleted');
    }
  }, [isSuccess]);

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && (
        <ProfileSubHeader title="My Addresses">
          <Grid container my={3} spacing={2}>
            <Grid item xs={4}>
              <Card variant="outlined" sx={{ height: 250 }}>
                <CardActionArea sx={{ height: '100%' }} onClick={handleClickOpen}>
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
            </Grid>
            {customerAddresses.map((a) => (
              <Grid key={a._id} item xs={4}>
                <Card variant="outlined" sx={{ height: 250 }}>
                  <CardContent sx={{ height: '75%' }}>
                    <Typography variant="h6" gutterBottom>
                      {a.tag}
                    </Typography>
                    <Typography variant="body2">{`${a.addressLine1} ${a.addressLine2}`}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <Button color="secondary" size="small" onClick={handleEdit}>
                      Edit
                    </Button>
                    <EditAddressDialog
                      customerId={customerAuth.id}
                      currentAddress={a}
                      open={openEdit}
                      setOpen={setOpenEdit}
                    />
                    <Button color="error" size="small" onClick={() => handleDelete(a._id)}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <AddressDialog customerId={customerAuth.id} open={open} setOpen={setOpen} />
        </ProfileSubHeader>
      )}
    </div>
  );
};

export default Addresses;
