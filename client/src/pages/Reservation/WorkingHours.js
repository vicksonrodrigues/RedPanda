import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';
import React from 'react';

import Clock from '@mui/icons-material/AccessTime';

const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const WorkingHours = () => (
  <Box height="100%" display="flex" alignItems="center" justifyContent="center" width="100%">
    <Card variant="outlined" sx={{ m: 1, width: '100%', backgroundColor: 'primary.light' }}>
      <CardHeader
        title="Working Hour"
        titleTypographyProps={{ textAlign: 'center', variant: 'h3' }}
      />
      <CardContent sx={{ m: 2, border: 2 }}>
        {dayOfWeek.map((day) => (
          <Grid
            key={day}
            container
            spacing={1}
            direction="row"
            alignItems="center"
            paddingBottom={1}
          >
            <Grid
              item
              xs={4}
              sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}
            >
              <Clock />
              <Typography marginLeft={1} variant="body2" color="text.secondary">
                {day}
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
        ))}
      </CardContent>
    </Card>
  </Box>
);

export default WorkingHours;
