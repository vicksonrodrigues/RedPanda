import React from 'react';
import { Box, Typography } from '@mui/material';

const SubWindow = ({ children, name }) => (
  <Box display="flex" flexDirection="column " justifyContent="center" mt={4}>
    {name ? (
      <Typography
        gutterBottom
        variant="h3"
        align="center"
        m={4}
        color="secondary.main"
        sx={{ fontWeight: 500 }}
      >
        {name}
      </Typography>
    ) : (
      <div />
    )}

    {children}
  </Box>
);

export default SubWindow;
