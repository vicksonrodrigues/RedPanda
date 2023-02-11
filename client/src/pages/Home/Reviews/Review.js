import { Grid, Rating, Typography } from '@mui/material';
import React from 'react';

const Review = ({ review }) => (
  <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
    <Grid item>
      <Typography>{review.comment}</Typography>
    </Grid>
    <Grid item>
      <Typography variant="h6">{review.commenter}</Typography>
    </Grid>
    <Grid item>
      <Rating name="read-only" value={review.star} readOnly />
    </Grid>
  </Grid>
);

export default Review;
