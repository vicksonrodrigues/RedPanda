import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';

const ReservationForm = () => (
  <Box p={2}>
    <Box p={1}>
      <Typography variant="h4" textAlign="center">
        Reserve Table
      </Typography>
    </Box>
    <Box p={1} component="form">
      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Name
        </Typography>
        <TextField placeholder="First Name" sx={{ width: '50%', pr: 1 }} />
        <TextField placeholder="Last Name" sx={{ width: '50%', pl: 1 }} />
      </Box>
      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Phone
        </Typography>
        <TextField placeholder="Phone Number" fullWidth />
      </Box>
      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Email
        </Typography>
        <TextField placeholder="Email" fullWidth type="email" />
      </Box>
      <Box display="flex">
        <Box width="50%">
          <Typography mb={1} mt={1} variant="subtitle2">
            Date
          </Typography>
          <TextField
            id="date"
            type="date"
            fullWidth
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box width="50%">
          <Typography mb={1} mt={1} variant="subtitle2">
            Time
          </Typography>
          <TextField
            id="time"
            type="time"
            defaultValue="07:30"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            fullWidth
          />
        </Box>
      </Box>
      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Number of Guest
        </Typography>
        <TextField
          defaultValue={1}
          fullWidth
          type="number"
          inputProps={{
            min: 1,
            max: 8,
          }}
        />
      </Box>
      <Box>
        <Typography mb={1} mt={1} variant="subtitle2">
          Special Request
        </Typography>
        <TextField placeholder="any special need or requirement" multiline fullWidth minRows={4} />
      </Box>
      <Box p={2} display="flex" justifyContent="center" alignItems="center" width="100%">
        <Button variant="contained">Submit</Button>
      </Box>
    </Box>
  </Box>
);

export default ReservationForm;
