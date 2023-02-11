import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import award1 from '../../assests/Award1.png';
import award2 from '../../assests/Award2.png';
import award3 from '../../assests/Award3.png';
import award4 from '../../assests/Award4.png';
import award5 from '../../assests/Award5.png';

const awards = [
  {
    img: `${award1}`,
    title: 'Breakfast',
  },
  {
    img: `${award2}`,
    title: 'Burger',
  },
  {
    img: `${award3}`,
    title: 'Camera',
  },
  {
    img: `${award4}`,
    title: 'Coffee',
  },
  {
    img: `${award5}`,
    title: 'Coffee',
  },
];

const AwardWinning = () => (
  <Box m={3} p={2}>
    <Grid container direction={{ xs: 'column', md: 'row' }}>
      <Grid item xs={12} md={7}>
        <Typography variant="h4" textAlign="center" sx={{ m: 2 }}>
          Award Winning Restaurant
        </Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris.
        </Typography>
      </Grid>
      <Grid container item xs={12} md={5}>
        {awards.map((item) => (
          <Grid item key={item.img} xs={4} justifyContent="center" display="flex" p={2}>
            <img src={`${item.img}`} alt={item.title} height="100" />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Box>
);

export default AwardWinning;
