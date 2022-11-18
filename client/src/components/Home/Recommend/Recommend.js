import React from 'react';

import {
  Box,
  Container,
  Divider,
  Typography,
  // Stack,
  // Button,
} from '@mui/material';

import Carousel from 'react-material-ui-carousel';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import recommendProduct from './data';
import Banner from './Banner';

const _ = require('lodash');

const Recommend = () => {
  const arraySplit = _.chunk(recommendProduct, 3);
  return (
    <Container>
      <Divider />
      <Box my={5}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          m={5}
        >
          <Typography variant="h3">RECOMMENDED BY OUR CHEF</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          mx={20}
        >
          <Typography align="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip.
          </Typography>
        </Box>
        <Box mt={5}>
          <Carousel
            NextIcon={<ArrowForwardIosRoundedIcon />}
            PrevIcon={<ArrowBackIosRoundedIcon />}
            stopAutoPlayOnHover
            cycleNavigation={false}
            fullHeightHover
            indicators={false}
            height={450}
            navButtonsAlwaysVisible
            sx={{
              px: 10,
            }}
          >
            {arraySplit.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Banner key={i} item={item} />
            ))}
          </Carousel>
        </Box>
      </Box>
    </Container>
  );
};
export default Recommend;
