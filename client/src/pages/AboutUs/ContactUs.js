import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MapWrapper from '../../components/MapWrapper';
import SocialButtons from '../../components/Social';

const locations = [
  {
    name: 'Vashi',
    address: 'G-Floor, InOrbit Mall, Sec-10, Vashi, Navi Mumbai',
    location: [73.00110340118408, 19.065504782898323],
  },
  {
    name: 'Kharghar',
    address: 'Shop 11-12, Raymond Yard, Sec-10, Kharghar, Navi Mumbai',
    location: [73.08292150497435, 19.059724703316043],
  },
  {
    name: 'Belapur',
    address: 'Shop 23-25, Opp. Decathlon, Sec-4, Belapur, Navi Mumbai',
    location: [73.03668022155762, 19.00816154354417],
  },
];

const ContactUs = () => {
  const [location, setLocation] = React.useState('Vashi');

  const handleChange = (event, newLocation) => {
    if (newLocation !== null) {
      setLocation(newLocation);
    }
  };

  const currentLoc = locations.filter((loc) => loc.name === location);
  return (
    <Grid
      item
      container
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="space-evenly"
      mb={3}
      p={1}
    >
      <Grid
        item
        xs={5}
        width={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" width={1} textAlign="center">
          Contact Info
        </Typography>
        <Box
          width={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="subtitle2" sx={{ py: 2 }}>
            Locations
          </Typography>

          <ToggleButtonGroup
            color="secondary"
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
          <Box height={100} sx={{ p: 2 }}>
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
          <SocialButtons color="text.primary" />
        </Box>
      </Grid>
      <Grid item xs={5} width="100%">
        <MapWrapper locationData={locations} currentLocation={location} />
      </Grid>
    </Grid>
  );
};

export default ContactUs;

/*  <iframe
title="RedPanda Location"
src="https://www.google.com/maps/d/embed?mid=1why_35UbS6xJPeV3Xp_JzQ_N_WMf2Uc&ehbc=2E312F"
width="640"
height="480"
/> */
