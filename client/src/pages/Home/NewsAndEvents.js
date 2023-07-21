import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  CardHeader,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';

import SubWindow from '../../components/SubWindow';
import { useGetRestaurantEventQuery } from '../../features/restauantEvent.js/restauantEventApiSlice';

const truncate = require('lodash/truncate');

const NewsAndEvents = () => {
  const [eventType, setEventType] = useState('Single');
  const { single, recurring, isSuccess } = useGetRestaurantEventQuery('eventList', {
    selectFromResult: ({ data, isSuccess }) => ({
      single: data?.filter((resEvent) => resEvent.scheduleType === 'single'),
      recurring: data?.filter((resEvent) => resEvent.scheduleType === 'recurring'),
      isSuccess,
    }),
  });
  const [events, setEvents] = useState(null);

  useEffect(() => {
    if (isSuccess) setEvents(single);
  }, [isSuccess]);

  useEffect(() => {
    if (eventType === 'Single') {
      setEvents(single);
    }
    if (eventType === 'Recurring') {
      setEvents(recurring);
    }
  }, [eventType]);
  const handleEventChange = (event, newEventType) => {
    if (newEventType !== null) {
      setEventType(newEventType);
    }
  };
  return (
    <SubWindow name="Events">
      <Grid container direction="column" rowSpacing={3} alignItems="center" mb={3}>
        <Grid item>
          <Typography>Check out the Latest and Upcoming Events at our Restaurant</Typography>
        </Grid>
        <Grid item>
          <ToggleButtonGroup value={eventType} onChange={handleEventChange} exclusive>
            <ToggleButton value="Single">One Time</ToggleButton>
            <ToggleButton value="Recurring">Recurring</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid
          item
          container
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-evenly"
          alignItems="stretch"
        >
          {events?.map((event) => (
            <Grid item key={event.eventName} sm={4} m={3}>
              <Card
                raised
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  width: '100%',
                  borderRadius: '25px',
                }}
              >
                <CardMedia
                  component="img"
                  width="100%"
                  // eslint-disable-next-line global-require
                  image={event.img}
                  alt={event.eventName}
                  sx={{
                    display: 'flex',
                    objectFit: 'contain',
                    borderWidth: '4px 4px 2px 4px  ',
                    borderStyle: 'solid',
                    borderColor: 'secondary.light',
                    borderTopRightRadius: '25px',
                    borderTopLeftRadius: '25px',
                  }}
                />
                <CardHeader
                  title={event.eventName}
                  titleTypographyProps={{
                    variant: 'h6',
                    fontWeight: '500',
                    textAlign: 'center',
                    color: 'secondary.light',
                  }}
                  sx={{
                    backgroundColor: 'neutral.main',
                    height: '100px',
                  }}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: '1',
                    padding: 0,
                    borderWidth: '2px 4px 0 4px  ',
                    borderStyle: 'solid',
                    borderColor: 'secondary.light',
                  }}
                >
                  <Box>
                    <Box display="flex" p={2} alignItems="center">
                      <InsertInvitationRoundedIcon fontSize="small" />
                      <Typography variant="subtitle2" ml={2} sx={{ whiteSpace: 'pre-line' }}>
                        {event.scheduleDescription}
                      </Typography>
                    </Box>

                    <Divider variant="middle" sx={{ bgcolor: 'text.primary' }} />
                    <Box p={2} sx={{ overflow: 'hidden' }}>
                      <Typography variant="body2" m={1}>
                        {truncate(event.description, { length: 170, separator: ' ' })}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{
                    width: '100%',
                    display: 'flex',
                    borderWidth: '0px 4px 4px 4px  ',
                    borderStyle: 'solid',
                    borderColor: 'secondary.light',
                    borderBottomRightRadius: '25px',
                    borderBottomLeftRadius: '25px',
                  }}
                >
                  <Box display="flex" p={2}>
                    <Button size="small" variant="contained" color="secondary">
                      Learn More
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </SubWindow>
  );
};
export default NewsAndEvents;
