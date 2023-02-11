import React from 'react';
import { Box, Typography } from '@mui/material';

const PageHeader = ({ children, pageName }) => (
  <Box height="auto">
    <Box
      display="flex"
      justifyContent="center"
      p={2}
      border={5}
      bgcolor="neutral.main"
      m={2}
      sx={{ borderColor: 'secondary.main' }}
    >
      <Typography variant="h4" color="secondary.light" fontWeight="bolder">
        {pageName}
      </Typography>
    </Box>
    {children}
  </Box>
);

export default PageHeader;
