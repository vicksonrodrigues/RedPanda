import { Box, Container, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import Review from './Review';
import reviewService from '../../../services/reviews';

import { ReactComponent as Quotes } from '../../../assests/Icons/quote.svg';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    reviewService.getAll().then((initialNotes) => {
      setReviews(initialNotes);
    });
  }, []);

  return (
    <Container>
      <Box>
        <Typography variant="h3" textAlign="center" mb={3}>
          Custommer Reviews
        </Typography>
        <Divider>
          <Quotes />
        </Divider>
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
      </Box>
    </Container>
  );
};

export default ReviewList;
