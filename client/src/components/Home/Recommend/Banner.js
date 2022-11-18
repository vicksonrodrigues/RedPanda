/* eslint-disable react/destructuring-assignment */
import React from 'react';

import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';

const Banner = (props) => {
  const totalItems = 3;
  const items = [];
  for (let i = 0; i < totalItems; i++) {
    const item = props.item[i];
    const card = (
      <Grid item xs={12 / totalItems} key={i}>
        <Card>
          <Avatar
            variant="square"
            sx={{
              position: 'absolute',
              bgcolor: 'secondary.main',
              transform: 'translateY(25%)',
              width: 50,
              height: 30,
              ml: 2,
            }}
          >
            <Typography variant="subtitle2">NEW</Typography>
          </Avatar>
          <CardMedia
            component="img"
            height="200"
            // eslint-disable-next-line global-require
            // eslint-disable-next-line global-require
            image={require('../../../assests/Carousel/burger.jpg')}
            alt="green iguana"
          />
          <Box display="flex" justifyContent="center" alignItems="center">
            <Avatar
              sx={{
                position: 'absolute',
                bgcolor: 'secondary.main',
                transform: 'translateY(-5%)',
                width: 50,
                height: 50,
              }}
            >
              <Typography>${item.price}</Typography>
            </Avatar>
          </Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign="center" m={2}>
              {item.name}
            </Typography>

            <Divider />
            <Typography variant="body2" color="text.secondary" m={1}>
              {item.description}
            </Typography>
          </CardContent>
        </Card>
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
