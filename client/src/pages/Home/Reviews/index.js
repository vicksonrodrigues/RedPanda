import { Box, Divider } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import Review from './Review';
// import reviewService from '../../../services/reviews';

import { ReactComponent as Quotes } from '../../../assests/Icons/quote.svg';
import SubWindow from '../../../components/SubWindow';

const ReviewList = () => {
  const reviews = [
    {
      id: 23434,
      comment: 'nice restauarant',
      commenter: 'helen',
      star: 3,
    },
  ];
  return (
    <SubWindow name="Customer Reviews">
      <Box>
        <Divider sx={{ width: '40%', margin: 'auto' }}>
          <Quotes />
        </Divider>
      </Box>
      <Carousel
        stopAutoPlayOnHover
        cycleNavigation={false}
        fullHeightHover
        indicators={false}
        navButtonsAlwaysVisible
        sx={{
          p: 10,
        }}
      >
        {reviews.map((item) => (
          <Review key={item.id} review={item} />
        ))}
      </Carousel>
    </SubWindow>
  );
};

export default ReviewList;
