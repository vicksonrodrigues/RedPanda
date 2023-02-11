import { Box } from '@mui/material';
import React from 'react';
import NewsAndEvents from './NewsAndEvents';
import HomeMenu from './HomeMenu';
import Recommend from './Recommend';
import ReviewList from './Reviews';
import Welcome from './Welcome';
import useTitle from '../../hooks/useTitle';

const Home = () => {
  useTitle('RedPanda');
  return (
    <Box>
      <Welcome />
      <HomeMenu />
      <Recommend />
      <ReviewList />
      <NewsAndEvents />
    </Box>
  );
};
export default Home;
