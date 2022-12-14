import { Box, Grid, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import locations from '../Map/data';
import MapWrapper from '../Map/MapWrapper';

const ContactUs = () => {
  const [location, setLocation] = React.useState('Vashi');

  const handleChange = (event, newLocation) => {
    if (newLocation !== null) {
      setLocation(newLocation);
    }
  };

  const currentLoc = locations.filter((loc) => loc.name === location);
  return (
    <Box m={3} p={2}>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h3">Contact Info</Typography>
          <Box>
            <Typography variant="subtitle2" sx={{ py: 2 }}>
              Locations
            </Typography>

            <ToggleButtonGroup
              color="primary"
              value={location}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              {locations.map((l) => (
                <ToggleButton key={l.name} value={l.name}>
                  {l.name}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Box width="75%" height={100} sx={{ p: 2 }}>
              <Typography variant="subtitle2">Address : </Typography>
              <Typography> {currentLoc[0].address}</Typography>
            </Box>
          </Box>
          <Box display="flex" my={1} alignItems="center">
            <EmailIcon />
            <Typography variant="caption" sx={{ marginLeft: 2 }}>
              redpand@food.com
            </Typography>
          </Box>
          <Box display="flex" my={1} alignItems="center">
            <PhoneIcon />
            <Typography variant="caption" sx={{ marginLeft: 2 }}>
              1-222-333-444
            </Typography>
          </Box>
          <Box display="flex" my={1} alignItems="center" flexWrap="wrap">
            <Typography variant="subtitle2" color="text.primary">
              On Social Media :
            </Typography>
            <Box>
              <IconButton>
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton>
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton>
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} width="100%">
          <MapWrapper locationData={locations} currentLocation={location} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;

/*  <iframe
title="RedPanda Location"
src="https://www.google.com/maps/d/embed?mid=1why_35UbS6xJPeV3Xp_JzQ_N_WMf2Uc&ehbc=2E312F"
width="640"
height="480"
/> */
