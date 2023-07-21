import React from 'react';

import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';

import Carousel from 'react-material-ui-carousel';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
// import recommendProduct from './data';
import Banner from './Banner';
import SubWindow from '../../../components/SubWindow';
import { useGetMenuQuery } from '../../../features/menu/menuApiSlice';

const _ = require('lodash');

const Recommend = () => {
  const { recommendDishes } = useGetMenuQuery('recList', {
    selectFromResult: ({ data }) => ({
      recommendDishes: data?.filter((items) => items.chefRecommended),
    }),
  });
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up('md'));
  const smallToMid = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  let carouselCardCount = 3;
  if (greaterThanMid) {
    carouselCardCount = 3;
  } else if (smallToMid) {
    carouselCardCount = 2;
  } else {
    carouselCardCount = 1;
  }
  const arraySplit = _.chunk(recommendDishes, carouselCardCount);
  return (
    <SubWindow name={`Chef's Recommendation`}>
      <Grid container alignItems="center" justifyContent="center" direction="column" width="100%">
        <Grid item width="70%">
          <Typography textAlign="center">
            {`${`At RedPanda, we take immense pride in the talent and creativity of our exceptional chefs.
          Each one of them possesses a passion for crafting exquisite dishes, using the finest
          ingredients and innovative techniques to bring flavors to life. Our Chef's Recommendation 
          is a curated selection of their most exceptional creations, handpicked to showcase
          their culinary prowess and ignite your taste buds.
          From artfully plated masterpieces to comfort food with a gourmet twist, each dish represents the unique style and culinary vision of our talented chefs`}`}
          </Typography>
        </Grid>

        <Grid item mt={5} width={1} height={1} justifyContent="center">
          <Carousel
            NextIcon={<ArrowForwardIosRoundedIcon />}
            PrevIcon={<ArrowBackIosRoundedIcon />}
            stopAutoPlayOnHover
            cycleNavigation
            indicators={false}
            navButtonsAlwaysVisible
            interval={30000}
            swipe={false}
            sx={{
              px: 7,
              height: '100%',
            }}
          >
            {arraySplit.map((item, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Banner key={i} item={item} />
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </SubWindow>
  );
};
export default Recommend;
