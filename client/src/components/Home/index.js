import { Box } from '@mui/material';
import React from 'react';
import NewsAndEvents from './NewsAndEvents';
import HomeMenu from './HomeMenu';
import Recommend from './Recommend/Recommend';
import ReviewList from './Review/ReviewList';
import Welcome from './Welcome';

const Home = () => (
  <Box>
    <Welcome />
    <HomeMenu />
    <Recommend />
    <ReviewList />
    <NewsAndEvents />
  </Box>
);

export default Home;
