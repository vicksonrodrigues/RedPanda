import { Box, Typography, Paper, Button, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import ProfileSubHeader from '../../components/ProfileSubHeader';
import customerService from '../../services/customers';
import { currentCustomer } from '../../reducers/customer';

const Details = ({ tabValue, index }) => {
  const customer = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const customerId = customer?.id;
  // eslint-disable-next-line no-unused-vars
  const [editDisable, setEditDisable] = useState(true);
  const [firstName, setFirstName] = useState(customer?.firstName);
  const [lastName, setLastName] = useState(customer?.lastName);
  const [phone, setPhone] = useState(customer?.phone);
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
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setPhone(customer.phone);
      setEditDisable(!editDisable);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    customerService
      .updateBasic(customerId, {
        firstName,
        lastName,
        phone,
      })
      .then((customer) => {
        dispatch(currentCustomer(customer));
        setFirstName(customer.firstName);
        setLastName(customer.lastName);
        setPhone(customer.phone);
        setEditDisable(!editDisable);
      });
  };
  return (
    <div role="tabpanel" hidden={tabValue !== index} id={`simple-tabpanel-${index}`}>
      {tabValue === index && (
        <ProfileSubHeader>
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
            <Box component={Paper} elevation={3} p={3} sx={{ width: '80%' }}>
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
                  {customer?.email}
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
