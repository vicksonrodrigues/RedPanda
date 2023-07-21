/* eslint-disable global-require */
import { Typography, Box, Button, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import SubWindow from '../../components/SubWindow';

const Welcome = () => (
  <SubWindow>
    <Grid
      container
      direction={{ md: 'row', xs: 'column' }}
      spacing={3}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Grid
        item
        xs={6}
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h1" sx={{ my: 2, textAlign: 'center' }} color="secondary.main">
          WELCOME TO RED PANDA
        </Typography>
        <Typography sx={{ my: 2, textAlignLast: 'center', textAlign: 'center' }}>
          Red Panda combines flavors & inspiration from the Far East & the West to create what we
          think is the best! Home to the original Tikka Burger, we specialize in burger, as well as
          handmade pizzas, pasta with a wide range of customization and appetizers . Feel free to
          indulge in chill and fun shakes with our fantastic unique cuisine. Whether you&apos;re
          ordering a multi-course meal or grabbing a coffee, Red Panda&apos;s lively, casual yet
          upscale atmosphere makes it perfect for dining with friends, family, clients and business
          associates.
        </Typography>
        <Button variant="contained" color="secondary" component={Link} to="/about">
          <Typography>Read More</Typography>
        </Button>
      </Grid>
      <Grid item xs={6} alignItems="center" justifyContent="center" display="flex">
        <Box
          component="img"
          src="http://d3j0x1xj96q3am.cloudfront.net/RestuarantMain.jpg"
          sx={{ maxWidth: '100%', height: 'auto', p: 4 }}
        />
      </Grid>
    </Grid>
  </SubWindow>
);

export default Welcome;
