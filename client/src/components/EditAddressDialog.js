/* eslint-disable no-underscore-dangle */
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
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { useUpdateExistingAddressMutation } from '../features/customer/customerApiSlice';
import { setNotification } from '../features/notification/notificationSlice';

const EditAddressDialog = ({ customerId, open, setOpen, currentAddress }) => {
  const [editAddress, { isLoading, isSuccess }] = useUpdateExistingAddressMutation();

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
  const [addressLine1, setAddressLine1] = useState(currentAddress?.addressLine1);
  const [addressLine2, setAddressLine2] = useState(currentAddress?.addressLine2);
  const [landmark, setLandmark] = useState(currentAddress?.landmark);
  const [zipCode, setZipCode] = useState(currentAddress?.zip);
  const [tag, setTag] = useState(currentAddress?.tag);

  const handleAddressLine1 = (event) => {
    setAddressLine1(event.target.value);
  };

  const handleAddressLine2 = (event) => {
    setAddressLine2(event.target.value);
  };

  const handleLandmark = (event) => {
    setLandmark(event.target.value);
  };
  const handleZip = (event) => {
    setZipCode(event.target.value);
  };
  const handleTag = (event) => {
    setTag(event.target.value);
  };
  const handleEdit = async (event) => {
    event.preventDefault();

    if (isLoading === false) {
      try {
        const newAddress = {
          addressLine1,
          addressLine2,
          landmark,
          zip: zipCode,
          tag,
        };

        await editAddress({
          id: customerId,
          addressId: currentAddress._id,
          updateAddress: newAddress,
        });
      } catch (err) {
        notify(`${err.data?.error}`, 'error');
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      notify('Address updated');
    }
  }, [isSuccess]);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <form onSubmit={handleEdit}>
        <DialogTitle>
          Edit Address details
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
              value={addressLine1}
              onChange={handleAddressLine1}
              required
              id="address1"
              label="Address Line 1"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={addressLine2}
              onChange={handleAddressLine2}
              id="address2"
              label="Address Line 2"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={landmark}
              onChange={handleLandmark}
              id="landmark"
              label="Landmark"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={zipCode}
              onChange={handleZip}
              required
              id="zipcode"
              label="ZipCode"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              value={tag}
              onChange={handleTag}
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
          <Button type="submit" variant="contained" onClick={handleClose} fullWidth>
            Edit Address
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditAddressDialog;
