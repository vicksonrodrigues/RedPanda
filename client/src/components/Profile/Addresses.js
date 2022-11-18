import {
  Box,
  Typography,
  Paper,
  CardContent,
  Card,
  Grid,
  CardActions,
  Button,
  CardActionArea,
} from '@mui/material';
import React from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const addressList = [
  {
    name: 'Home',
    address:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    name: 'Friend1',
    address:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    name: 'Home2',
    address:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    name: 'Office',
    address:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
];

const Addresses = ({ value, index }) => (
  <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
    {value === index && (
      <Box component={Paper} sx={{ m: 3, p: 3 }} border={1} borderColor="divider">
        <Box
          display="flex"
          justifyContent="flex-start"
          my={3}
          pb={1}
          borderBottom={1}
          borderColor="divider"
        >
          <Typography variant="h4">My Addresses</Typography>
        </Box>
        <Grid container my={3} spacing={2}>
          <Grid item xs={4}>
            <Card variant="outlined" sx={{ height: 250 }}>
              <CardActionArea sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    flexDirection: 'column',
                  }}
                >
                  <AddCircleOutlineIcon />
                  <Typography variant="body2" m={1}>
                    Add Address
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          {addressList.map((a) => (
            <Grid item xs={4}>
              <Card variant="outlined" sx={{ height: 250 }}>
                <CardContent sx={{ height: '75%' }}>
                  <Typography variant="h6" gutterBottom>
                    {a.name}
                  </Typography>
                  <Typography variant="body2">{a.address}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Button color="secondary" size="small">
                    Edit
                  </Button>
                  <Button color="error" size="small">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    )}
  </div>
);

export default Addresses;
