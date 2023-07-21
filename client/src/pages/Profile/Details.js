import { Box, Typography, Paper, Button, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import ProfileSubHeader from '../../components/ProfileSubHeader';
import { useUpdateBasicDetailsMutation } from '../../features/customer/customerApiSlice';
import { setNotification } from '../../features/notification/notificationSlice';

const Details = ({ value, index, customerAuth, customerDetails }) => {
  const dispatch = useDispatch();

  const [updateDetails, { isLoading, isSuccess, isError, error }] = useUpdateBasicDetailsMutation();
  const customerId = customerAuth?.id;

  // eslint-disable-next-line no-unused-vars
  const [editDisable, setEditDisable] = useState(true);
  const [firstName, setFirstName] = useState(customerDetails?.firstName);
  const [lastName, setLastName] = useState(customerDetails?.lastName);
  const [phone, setPhone] = useState(customerDetails?.phone);

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
  };

  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleEdit = () => {
    setEditDisable(!editDisable);
  };

  const handleCancel = () => {
    if (editDisable === false) {
      setFirstName(customerDetails?.firstName);
      setLastName(customerDetails?.lastName);
      setPhone(customerDetails?.phone);
      setEditDisable(!editDisable);
    }
  };

  const notify = (notificationMessage, notificationType, notificationOpen = true) => {
    dispatch(
      setNotification({
        notificationOpen,
        notificationType,
        notificationMessage,
      }),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!isLoading) {
        const details = { firstName, lastName, phone };
        await updateDetails({
          id: customerId,
          updateCustomer: details,
        }).unwrap();
      }
    } catch (err) {
      notify(`${err.data?.error}`, 'error');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      notify('Update Successful', 'success');
      setEditDisable(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      handleCancel();
      notify(`${error?.data?.message}`, 'error');
    }
  }, [isError]);

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && (
        <ProfileSubHeader title="Your Details">
          <Box
            display="flex"
            borderBottom={1}
            borderColor="divider"
            my={3}
            pb={1}
            sx={{ justifyContent: 'space-between' }}
          >
            <Typography variant="subtitle2">Personal Information</Typography>
            {editDisable && (
              <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => handleEdit()}
              >
                Edit
              </Button>
            )}
          </Box>
          {!editDisable && (
            <Box my={1}>
              <Typography variant="subtitle2">Edit Information</Typography>
            </Box>
          )}

          <form onSubmit={handleSubmit}>
            <Box component={Paper} elevation={3} p={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography width={120} fontWeight="bolder" sx={{ color: 'secondary.light' }}>
                  Name:
                </Typography>
                <Stack direction="column">
                  <Typography variant="caption" px={1} color="secondary.light">
                    First Name
                  </Typography>
                  <TextField
                    value={firstName}
                    onChange={handleFirstName}
                    size="small"
                    disabled={editDisable}
                    sx={{
                      '& .Mui-disabled': {
                        '& .MuiOutlinedInput-input': {
                          py: '5px',
                        },
                        ' .MuiOutlinedInput-notchedOutline': {
                          border: '0px',
                        },
                      },
                    }}
                  />
                </Stack>
                <Stack direction="column">
                  <Typography variant="caption" px={1} color="secondary.light">
                    Last Name
                  </Typography>
                  <TextField
                    value={lastName}
                    onChange={handleLastName}
                    size="small"
                    disabled={editDisable}
                    sx={{
                      '& .Mui-disabled': {
                        ' .MuiOutlinedInput-input': {
                          py: '5px',
                        },

                        ' .MuiOutlinedInput-notchedOutline': {
                          border: '0px',
                        },
                      },
                    }}
                  />
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                <Typography width={120} fontWeight="bolder" sx={{ color: 'secondary.light' }}>
                  Phone Number:
                </Typography>
                <TextField
                  value={phone}
                  size="small"
                  disabled={editDisable}
                  onChange={handlePhone}
                  sx={{
                    '& .Mui-disabled': {
                      ' .MuiOutlinedInput-notchedOutline': {
                        border: '0px',
                      },
                    },
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                <Typography width={120} fontWeight="bolder" sx={{ color: 'secondary.light' }}>
                  E-Mail:
                </Typography>
                <Typography color="text.disabled" px={2}>
                  {customerDetails?.email}
                </Typography>
              </Stack>
            </Box>
            {!editDisable && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width={150}
                m={2}
              >
                <Button color="secondary" variant="contained" size="small" onClick={handleSubmit}>
                  Submit
                </Button>
                <Button color="secondary" variant="contained" size="small" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            )}
          </form>
        </ProfileSubHeader>
      )}
    </div>
  );
};

export default Details;
