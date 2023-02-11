import React from 'react';
import { Container, Divider, Typography } from '@mui/material';

const SubWindow = ({ children, name, last }) => (
  <Container disableGutters sx={{ pt: 2 }}>
    {name ? (
      <Typography
        gutterBottom
        variant="h3"
        component="div"
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
    {!last ? <Divider variant="middle" sx={{ p: 2 }} /> : <div />}
  </Container>
);

export default SubWindow;
