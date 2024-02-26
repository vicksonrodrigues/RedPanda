import { Box, Typography, Container, Grid, Stack, Button } from '@mui/material';
import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import LocationIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

import { Link } from 'react-router-dom';
import SocialButtons from './Social';

const siteLinks = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Menu',
    link: '/menu',
  },
  {
    name: 'Gallery',
    link: '/gallery',
  },
  {
    name: 'About Us',
    link: '/about',
  },
  {
    name: 'Cart',
    link: '/cart',
  },
  {
    name: 'Reservation',
    link: '/reservation',
  },
];

const Footer = () => (
  <Box display={{ xs: 'none', sm: 'flex' }} bgcolor="primary.light" py={2}>
    <Container disableGutters>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justifyContent="space-around"
        spacing={2}
        sx={{ pb: 2, borderBottom: '1px dashed grey' }}
      >
        <Grid item display="flex" flexDirection="column" xs={3}>
          <Box display="flex" flexDirection="column">
            <Typography mb={1} variant="h5">
              Contact
            </Typography>
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
              <SocialButtons />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h5" mb={1}>
            Locations
          </Typography>
          <Typography variant="overline" fontWeight="medium">
            Kharghar Branch:
          </Typography>
          <Box display="flex" my={1} alignItems="center">
            <LocationIcon />
            <Typography variant="caption" sx={{ marginLeft: 2 }}>
              Shop 11-12, Raymond Yard, Sec-10, Kharghar, Navi Mumbai
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Stack>
            <Typography variant="h5" mb={1} textAlign="left">
              Site Map
            </Typography>
            <Grid container alignItems="center" justifyContent="space-between">
              {siteLinks.map((siteLink) => (
                <Grid item xs={5} sx={{ padding: '0px' }}>
                  <Button
                    key={siteLink.name}
                    component={Link}
                    to={siteLink.link}
                    sx={{ padding: '0px', justifyContent: 'flex-start' }}
                  >
                    <Typography variant="overline" fontWeight="bold">
                      {siteLink.name}
                    </Typography>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <Box>
        <Box display="inline-flex" justifyContent="flex-start" mt={2} sx={{ width: '50%' }}>
          <Typography>© 2022 RedPanda, All Rights Reserved</Typography>
        </Box>
      </Box>
    </Container>
  </Box>
);

export default Footer;
