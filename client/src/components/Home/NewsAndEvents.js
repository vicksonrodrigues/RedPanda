import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import InsertInvitationRoundedIcon from '@mui/icons-material/InsertInvitationRounded';
import eventService from '../../services/events';

const NewsAndEvents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    eventService.getAll().then((initialEventList) => {
      setEvents(initialEventList);
    });
  }, []);
  return (
    <Container>
      <Box my={5}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          m={5}
        >
          <Typography variant="h3">Events & News</Typography>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
          <Typography>Check out the Latest and Upcoming Events at our Restaurant</Typography>
        </Box>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2} m={5}>
          {events.map((event) => (
            <Box key={event.eventName}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="200"
                  // eslint-disable-next-line global-require
                  image={event.img}
                  alt={event.eventName}
                  sx={{
                    objectFit: 'cover',
                    p: 1,
                  }}
                />
                <CardContent>
                  <Box display="flex" alignItems="center" my={1}>
                    <InsertInvitationRoundedIcon fontSize="small" />
                    <Typography variant="caption" ml={1}>
                      {event.date}
                    </Typography>
                  </Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {event.eventName}
                  </Typography>

                  <Divider />
                  <Typography variant="body2" color="text.secondary" m={1}>
                    {event.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default NewsAndEvents;
