import { Box, Divider, Grid, Typography, Rating } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

import { ReactComponent as Quotes } from '../../assests/Icons/quote.svg';
import SubWindow from '../../components/SubWindow';
import { useGetReviewQuery } from '../../features/review/reviewApiSlice';

const Review = ({ review }) => (
  <Grid
    container
    direction="column"
    alignItems="center"
    minHeight="200px"
    width={1}
    justifyContent="space-evenly"
  >
    <Grid item>
      <Typography textAlign="center" px={3}>
        {review.comment}
      </Typography>
    </Grid>
    <Grid item height="20px" width={1} />
    <Grid
      item
      container
      direction="column"
      alignItems="center"
      justifyContent="space-evenly"
      height="40%"
      width={1}
    >
      <Grid item>
        <Typography variant="h6">{review.commenter}</Typography>
      </Grid>
      <Grid item>
        <Rating name="read-only" value={review.star} readOnly />
      </Grid>
    </Grid>
  </Grid>
);

const ReviewList = () => {
  const { data: reviews } = useGetReviewQuery('reviewList');
  return (
    <SubWindow name="Customer Reviews">
      <Box>
        <Divider sx={{ width: '40%', margin: 'auto' }}>
          <Quotes />
        </Divider>
      </Box>
      <Carousel
        stopAutoPlayOnHover
        cycleNavigation
        fullHeightHover
        indicators={false}
        navButtonsAlwaysVisible
        interval={30000}
        sx={{
          p: 7,
        }}
      >
        {reviews?.map((item) => (
          <Review key={item.id} review={item} />
        ))}
      </Carousel>
    </SubWindow>
  );
};

export default ReviewList;
