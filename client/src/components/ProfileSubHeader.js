import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

const ProfileSubHeader = ({ title, children }) => (
  <Box component={Paper} sx={{ m: 3, p: 2 }}>
    <Box
      display="flex"
      justifyContent="center"
      bgcolor="neutral.main"
      p={1}
      border={3}
      mb={2}
      borderColor="secondary.light"
    >
      <Typography variant="h4" fontWeight="bold" color="secondary.light">
        {title}
      </Typography>
    </Box>
    {children}
  </Box>
);

export default ProfileSubHeader;
