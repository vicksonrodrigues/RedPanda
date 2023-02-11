import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => (
  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Loader;
