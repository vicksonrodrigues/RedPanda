import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import React from 'react';

import Clock from '@mui/icons-material/AccessTime';

const WorkingHours = () => (
  <Box height="100%" display="flex" alignItems="center" justifyContent="center" width="100%">
    <Card variant="outlined" sx={{ m: 1, width: '100%' }}>
      <CardHeader title="Opening Hour" titleTypographyProps={{ textAlign: 'center' }} />
      <CardContent sx={{ m: 2, border: 2 }}>
        <Grid container spacing={1} direction="row" alignItems="center" paddingBottom={1}>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Clock />
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              Monday
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              9:00 - 22:00
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="row" alignItems="center" paddingBottom={1}>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Clock />
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              Tuesday
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              CLOSED
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="row" alignItems="center" paddingBottom={1}>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Clock />
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              Wednesday
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              9:00 - 22:00
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="row" alignItems="center" paddingBottom={1}>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Clock />
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              Thursday
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              9:00 - 22:00
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="row" alignItems="center" paddingBottom={1}>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Clock />
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              Friday
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              9:00 - 1:00
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="row" alignItems="center" paddingBottom={1}>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Clock />
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              Saturday
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              10:00 - 1:00
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={1} direction="row" alignItems="center" paddingBottom={1}>
          <Grid
            item
            xs={4}
            sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
          >
            <Clock />
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              Sunday
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Divider />
          </Grid>
          <Grid item xs={4}>
            <Typography marginLeft={1} variant="body2" color="text.secondary">
              10:00 - 22:00
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Box>
);

export default WorkingHours;
