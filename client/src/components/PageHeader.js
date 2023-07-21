import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const PageHeader = ({ children, pageName }) => (
  <Container
    maxWidth="xl"
    sx={{
      height: '100%',
      my: '16px',
      px: '32px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <Box
      width="100%"
      p={2}
      border={5}
      bgcolor="neutral.main"
      sx={{ borderColor: 'secondary.main' }}
      mb={3}
    >
      <Typography variant="h4" color="secondary.light" fontWeight="bolder" textAlign="center">
        {pageName}
      </Typography>
    </Box>
    {children}
  </Container>
);

export default PageHeader;
