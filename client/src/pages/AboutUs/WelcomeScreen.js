import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const WelcomeScreen = () => (
  <Grid
    container
    direction={{ md: 'row', xs: 'column' }}
    height="100%"
    justifyContent="space-evenly"
    p={1}
    mb={3}
  >
    <Grid item alignItems="center" justifyContent="center" display="flex" md={5}>
      <Box
        component="img"
        src="http://d3j0x1xj96q3am.cloudfront.net/RestuarantMain.jpg"
        sx={{ maxWidth: '100%', height: 'auto' }}
      />
    </Grid>

    <Grid item xs={5}>
      <Box display="flex" width="100%" justifyContent="center" p={2}>
        <Typography variant="h3">Welcome To Red Panda</Typography>
      </Box>
      <Box>
        <Typography>
          Nam vehicula commodo pulvinar. Morbi vel luctus dui. Maecenas faucibus dignissim ante, et
          sollicitudin eros rutrum viverra sed viverra.
        </Typography>
      </Box>
      <Box display="flex" width="100%" my={2}>
        <Box width="50%" mr={2}>
          <Typography textAlign="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean feugiat dictum lacus, ut
            hendrerit mi pulvinar vel. Fusce id nibh at neque eleifend tristique at sit amet libero.
            In aliquam in nisl nec sollicitudin. Sed consectetur volutpat sem vitae facilisis. Fusce
            tristique, magna ornare facilisis sagittis, tortor mi auctor libero.
          </Typography>
        </Box>
        <Box width="50%">
          <Typography textAlign="justify">
            In aliquam in nisl nec sollicitudin. Sed consectetur volutpat sem vitae facilisis. Fusce
            tristique, magna ornare facilisis sagittis, tortor mi auctor libero, non pharetra sem ex
            eu felis. Aenean egestas ut purus.
          </Typography>
        </Box>
      </Box>
    </Grid>
  </Grid>
);

export default WelcomeScreen;
