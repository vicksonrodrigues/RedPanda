/* eslint-disable react/jsx-props-no-spreading */
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';
import ImageGallery from './ImageGallery';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  useTitle('RedPanda - Gallery');

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} justifyContent="center">
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Gallery = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PageHeader pageName="Gallery">
      <Box display="flex" alignItems="center" px={3} justifyContent="center" pb={3}>
        <Typography textAlign="justify" sx={{ textAlignLast: 'center' }}>
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque at tellus felis. Sed
          fringilla, tellus non congue porttitor, dui eros faucibus ipsunec augue. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur.
        </Typography>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={2} mt={5}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label="Restuarants" {...a11yProps(0)} />
              <Tab label="Events" {...a11yProps(1)} />
              <Tab label="Award Cermony" {...a11yProps(2)} />
              <Tab label="Celebrity" {...a11yProps(3)} />
            </Tabs>
          </Grid>
          <Grid item xs={10}>
            <TabPanel value={value} index={0}>
              <Typography variant="h4" textAlign="center" pb={2}>
                Restuarant
              </Typography>
              <ImageGallery />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography variant="h4" textAlign="center" pb={2}>
                Events
              </Typography>
              <ImageGallery />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Typography variant="h4" textAlign="center" pb={2}>
                Award Cermony
              </Typography>
              <ImageGallery />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Typography variant="h4" textAlign="center" pb={2}>
                Celebrity
              </Typography>
              <ImageGallery />
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </PageHeader>
  );
};

export default Gallery;
