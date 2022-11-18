import { Box, Typography, Paper, Button, Stack, TextField } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

const Details = ({ value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
    {value === index && (
      <Box component={Paper} sx={{ m: 3, p: 3 }} border={1} borderColor="divider">
        <Box display="flex" justifyContent="flex-start">
          <Typography variant="h4">My Details</Typography>
        </Box>
        <Box
          display="flex"
          borderBottom={1}
          borderColor="divider"
          my={3}
          pb={1}
          sx={{ justifyContent: 'space-between' }}
        >
          <Typography>Personal Information</Typography>
          <Button variant="contained" size="small" startIcon={<EditIcon />}>
            Edit
          </Button>
        </Box>
        <Box component={Paper} variant="outlined" p={2} sx={{ width: '70%' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography width={100}>Name:</Typography>
            <TextField label="First Name" defaultValue="Vickson" size="small" disabled />
            <TextField label="Last Name" defaultValue="Rodrigues" size="small" disabled />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Typography width={100}>Date of Birth:</Typography>
            <TextField defaultValue="dd/mm/yy" size="small" disabled />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Typography width={100}>Phone Number:</Typography>
            <TextField defaultValue="0123456789" size="small" disabled />
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center" mt={2}>
            <Typography width={100}>E-Mail:</Typography>
            <TextField defaultValue="abc@redpanda.com" size="small" disabled />
          </Stack>
        </Box>
      </Box>
    )}
  </div>
);

export default Details;
