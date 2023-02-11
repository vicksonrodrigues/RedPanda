/* eslint-disable react/destructuring-assignment */
import React from 'react';

import { Grid } from '@mui/material';
import ItemCard from '../../../components/ItemCard';

const Banner = (props) => {
  const items = [];
  for (let i = 0; i < props.item.length; i++) {
    const item = props.item[i];
    const card = (
      <Grid item xs={4} key={i}>
        <ItemCard item={item} showQuantity />
      </Grid>
    );

    items.push(card);
  }
  return (
    <Grid container spacing={2}>
      {items}
    </Grid>
  );
};

export default Banner;
