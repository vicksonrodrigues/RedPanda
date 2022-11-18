import { Box, Typography } from '@mui/material';
import React from 'react';
import AwardWinning from './AwardWinning';
import ContactUs from './ContactUs';
import Counter from './Counter';
import WelcomeScreen from './WelcomeScreen';

const About = () => (
  <Box>
    <Box display="flex" justifyContent="center" p={2} border={1} bgcolor="primary.main">
      <Typography variant="h4">About Us</Typography>
    </Box>
    <WelcomeScreen />
    <AwardWinning />
    <Counter />
    <ContactUs />
  </Box>
);

export default About;
