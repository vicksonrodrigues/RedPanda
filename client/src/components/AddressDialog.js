import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useAddNewAddressMutation } from '../features/customer/customerApiSlice';
import { setNotification } from '../features/notification/notificationSlice';
import useField from '../hooks/useField';

const AddressDialog = ({ customerId, open, setOpen }) => {
  const [addAddress, { isLoading, isSuccess }] = useAddNewAddressMutation();
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

  const addressLine1 = useField('text');
  const addressLine2 = useField('text');
  const landmark = useField('text');
  const zipCode = useField('text');
  const tag = useField('text');

  const handleResetForm = () => {
    addressLine1.reset();
    addressLine2.reset();
    landmark.reset();
    zipCode.reset();
    tag.reset();
  };

  const handleClose = () => {
    handleResetForm();
    setOpen(false);
  };

  const handleAddAddress = async (event) => {
    event.preventDefault();

    if (!isLoading) {
      const newAddress = {
        addressLine1: addressLine1.fields.value,
        addressLine2: addressLine2.fields.value,
        landmark: landmark.fields.value,
        zip: zipCode.fields.value,
        tag: tag.fields.value,
      };

      try {
        await addAddress({ id: customerId, newAddress });
        handleClose();
      } catch (err) {
        notify(`${err.data?.error}`);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      notify('Address Successfully Added');
      handleResetForm();
    }
  }, [isSuccess]);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <form onSubmit={handleAddAddress}>
        <DialogTitle>
          Enter Address details
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack my={1} spacing={2}>
            <TextField
              value={addressLine1.fields.value}
              onChange={addressLine1.fields.onChange}
              required
              autoFocus
              id="address1"
              label="Address Line 1"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={addressLine2.fields.value}
              onChange={addressLine2.fields.onChange}
              id="address2"
              label="Address Line 2"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={landmark.fields.value}
              onChange={landmark.fields.onChange}
              id="landmark"
              label="Landmark"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={zipCode.fields.value}
              onChange={zipCode.fields.onChange}
              required
              id="zipcode"
              label="ZipCode"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={tag.fields.value}
              onChange={tag.fields.onChange}
              required
              id="tag"
              label="Address NickName/Title"
              type="text"
              fullWidth
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <Divider variant="middle" />
        <DialogActions sx={{ my: 1 }}>
          <Button type="submit" variant="contained" fullWidth>
            Save Address
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddressDialog;
