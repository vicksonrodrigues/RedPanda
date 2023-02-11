import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import background from '../../assests/WelcomeBackground.jpg';
// import restaurant from '../../assests/RestaurantImage.jpg';

const WelcomeScreen = () => (
  <Box sx={{ backgroundImage: `url(${background})` }} m={3}>
    <Grid container height="100%">
      <Grid item xs={7} p={2}>
        <Box
          component="img"
          src="http://d3j0x1xj96q3am.cloudfront.net/RestuarantMain.jpg"
          sx={{
            objectFit: 'contain',
            width: '95%',
          }}
          margin={1}
        />
      </Grid>
      <Grid item xs={5} p={2}>
        <Box display="flex" width="100%" justifyContent="center" p={2}>
          <Typography variant="h3" color="black">
            Welcome To Red Panda
          </Typography>
        </Box>
        <Box>
          <Typography color="black">
            Nam vehicula commodo pulvinar. Morbi vel luctus dui. Maecenas faucibus dignissim ante,
            et sollicitudin eros rutrum viverra sed viverra.
          </Typography>
        </Box>
        <Box display="flex" width="100%" my={2}>
          <Box width="50%" mr={2}>
            <Typography color="black" textAlign="justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat dictum lacus,
              ut hendrerit mi pulvinar vel. Fusce id nibh at neque eleifend tristique at sit amet
              libero. In aliquam in nisl nec sollicitudin. Sed consectetur volutpat sem vitae
              facilisis. Fusce tristique, magna ornare facilisis sagittis, tortor mi auctor libero.
            </Typography>
          </Box>
          <Box width="50%">
            <Typography color="black" textAlign="justify">
              In aliquam in nisl nec sollicitudin. Sed consectetur volutpat sem vitae facilisis.
              Fusce tristique, magna ornare facilisis sagittis, tortor mi auctor libero, non
              pharetra sem ex eu felis. Aenean egestas ut purus.
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default WelcomeScreen;
