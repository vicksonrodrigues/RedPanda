/* eslint-disable react/jsx-props-no-spreading */
import { Box, Divider, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';
import CustomImageList from './CustomImageList';

function TabPanel(props) {
  const { panelName, children, value, index, ...other } = props;

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
          <Box
            component={Paper}
            height={80}
            bgcolor="secondary.light"
            padding={2}
            alignContent="center"
            justifyContent="center"
            display="flex"
          >
            <Box sx={{ width: 500 }}>
              <Divider
                sx={{
                  '&::before': {
                    borderTop: '3px solid',
                    borderColor: 'neutral.main',
                  },
                  '&::after': {
                    borderTop: '3px solid',
                    borderColor: 'neutral.main',
                  },
                }}
              >
                <Typography variant="h4" color="neutral.main">
                  {panelName}
                </Typography>
              </Divider>
            </Box>
          </Box>
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
  useTitle('RedPanda - Gallery');
  return (
    <PageHeader pageName="Gallery">
      <Grid
        container
        direction="column"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item height={1} display="flex" justifyContent="center" alignItems="center" py={2}>
          <Typography
            textAlign="center"
            sx={{ textAlignLast: 'center' }}
            variant="subtitle1"
            width="80%"
          >
            {`Welcome to our restaurant's gallery! Here, you can take a look at all of our delicious
          food and vibrant atmosphere. From mouthwatering entrees to cozy booths, our restaurant has
          something for everyone. We invite you to explore our gallery and get a taste of what we
          have to offer. We look forward to seeing you soon!`}
          </Typography>
        </Grid>
        <Grid item container width={1} direction="row" justifyContent="space-evenly">
          <Grid item sm={2} mt={3}>
            <Tabs
              orientation="vertical"
              value={value}
              textColor="secondary"
              indicatorColor="secondary"
              onChange={handleChange}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab label="Ambience" {...a11yProps(0)} />
              <Tab label="Events" {...a11yProps(1)} />
              <Tab label="Foods" {...a11yProps(2)} />
            </Tabs>
          </Grid>
          <Grid display="block" item sm={9}>
            <TabPanel value={value} index={0} panelName="Ambience">
              <CustomImageList panelName="ambience" />
            </TabPanel>
            <TabPanel value={value} index={1} panelName="Events">
              <CustomImageList panelName="events" />
            </TabPanel>
            <TabPanel value={value} index={2} panelName="Foods">
              <CustomImageList panelName="foods" />
            </TabPanel>
          </Grid>
        </Grid>
      </Grid>
    </PageHeader>
  );
};

export default Gallery;
