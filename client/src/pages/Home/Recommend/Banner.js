/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';

import { Grid } from '@mui/material';
import ItemCard from '../../../components/ItemCard';

const Banner = (props) => {
  const items = [];
  const [firstImgLoaded, setFirstImgLoaded] = useState(false);

  for (let i = 0; i < props.item.length; i++) {
    const item = props.item[i];
    const card = (
      <Grid item sm={4} md={3} key={i} sx={{ mx: { xs: '44px', sm: '24px' } }}>
        <>
          <img
            src={item.img}
            alt="dummy"
            onLoad={() => setFirstImgLoaded(true)}
            style={{ display: 'none' }}
          />
          {firstImgLoaded && <ItemCard singleItem={item} showQuantity />}
        </>
      </Grid>
    );

    items.push(card);
  }
  return (
    <Grid
      container
      width={1}
      alignItems="center"
      justifyContent="space-evenly"
      direction={{ xs: 'column', sm: 'row' }}
    >
      {items}
    </Grid>
  );
};

export default Banner;
