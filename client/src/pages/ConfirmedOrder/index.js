import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PandaSmiling from '../../assests/PageImages/SmilingRedPanda.png';

const ConfirmedOrder = () => (
  <Grid container direction="column" justifyContent="center" alignItems="center" height={600}>
    <Grid>
      <img src={`${PandaSmiling}`} alt="Panda in bag" height="350" />
    </Grid>
    <Grid item p={1}>
      <Typography variant="h3" fontWeight="bold" color="primary.light">
        Thank you for ordering from Red Panda
      </Typography>
    </Grid>
    <Grid item p={1}>
      <Typography variant="h6" fontWeight="bold" color="secondary.light">
        Delight your taste buds with a delectable feast from RedPanda
      </Typography>
    </Grid>
    <Grid item m={3} display="flex" justifyContent="space-between" width="20%">
      <Button variant="contained" component={Link} to="/" sx={{ borderRadius: '25px' }}>
        Go to Main Page
      </Button>
      <Button variant="contained" component={Link} to="/profile" sx={{ borderRadius: '25px' }}>
        Check Order Status
      </Button>
    </Grid>
  </Grid>
);

export default ConfirmedOrder;
