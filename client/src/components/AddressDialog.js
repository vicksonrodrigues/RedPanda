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
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAddNewAddressMutation } from '../features/customer/customerApiSlice';
import { setNotification } from '../features/notification/notificationSlice';

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

  const validationSchema = yup.object({
    addressLine1: yup
      .string()
      .min(5, 'Must be 5 characters or more')
      .required('Address Line 1 is Required'),
    addressLine2: yup.string().min(2, 'Must be 2 characters or more'),
    landmark: yup.string().min(2, 'Must be 2 characters or more'),
    zipCode: yup
      .string()
      .matches(/^[1-9][0-9]{5}$/, { message: 'Please enter valid zip.' })
      .required('Zip Code is required'),
    tag: yup.string().min(2, 'Must be 2 character or more').required('Nick Name is required'),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      zipCode: '',
      tag: '',
    },
    initialErrors: {
      lastName: ' ',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!isLoading) {
        const newAddress = {
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          landmark: values.landmark,
          zip: values.zipCode,
          tag: values.tag,
        };
        try {
          await addAddress({ id: customerId, newAddress });
          handleClose();
        } catch (err) {
          notify(`${err.data?.error}`);
        }
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      notify('Address Successfully Added');
      formik.handleReset();
    }
  }, [isSuccess]);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <form onSubmit={formik.handleSubmit}>
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
              required
              id="addressLine1"
              name="addressLine1"
              type="text"
              label="Address Line 1"
              fullWidth
              value={formik.values.addressLine1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
              helperText={
                formik.touched.addressLine1 && formik.errors.addressLine1
                  ? formik.errors.addressLine1
                  : ' '
              }
              variant="outlined"
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              InputLabelProps={{ style: { color: 'black' } }}
            />
            <TextField
              id="addressLine2"
              name="addressLine2"
              type="text"
              label="Address Line 2"
              fullWidth
              value={formik.values.addressLine2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)}
              helperText={
                formik.touched.addressLine2 && formik.errors.addressLine2
                  ? formik.errors.addressLine2
                  : ' '
              }
              variant="outlined"
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              InputLabelProps={{ style: { color: 'black' } }}
            />
            <TextField
              id="landmark"
              name="landmark"
              type="text"
              label="Landmark"
              fullWidth
              value={formik.values.landmark}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.landmark && Boolean(formik.errors.landmark)}
              helperText={
                formik.touched.landmark && formik.errors.landmark ? formik.errors.landmark : ' '
              }
              variant="outlined"
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              InputLabelProps={{ style: { color: 'black' } }}
            />
            <TextField
              required
              id="zipCode"
              name="zipCode"
              type="text"
              label="Zip Code"
              fullWidth
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
              helperText={
                formik.touched.zipCode && formik.errors.zipCode ? formik.errors.zipCode : ' '
              }
              variant="outlined"
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              InputLabelProps={{ style: { color: 'black' } }}
            />
            <TextField
              required
              id="tag"
              name="tag"
              type="text"
              label="Nick Name"
              fullWidth
              value={formik.values.tag}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.tag && Boolean(formik.errors.tag)}
              helperText={formik.touched.tag && formik.errors.tag ? formik.errors.tag : ' '}
              variant="outlined"
              FormHelperTextProps={{ style: { backgroundColor: 'transparent' } }}
              InputLabelProps={{ style: { color: 'black' } }}
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
