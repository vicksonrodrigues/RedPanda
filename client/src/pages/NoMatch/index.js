import { Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import PandaError from '../../assests/PageImages/RedpandaErrorPage.png';

const NoMatch = () => (
  <Grid container direction="column" justifyContent="center" alignItems="center" height={600}>
    <Grid>
      <img src={PandaError} alt="Panda in bag" height="350" />
    </Grid>
    <Grid item p={1}>
      <Typography variant="subtitle2" fontSize={20} color="primary.light">
        Oh no, something went wrong
      </Typography>
    </Grid>

    <Grid item m={3}>
      <Button variant="contained" component={Link} to="/" sx={{ borderRadius: '25px' }}>
        Go to Main Page
      </Button>
    </Grid>
  </Grid>
);

export default NoMatch;
