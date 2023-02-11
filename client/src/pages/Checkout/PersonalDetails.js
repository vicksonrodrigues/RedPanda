import { Box, Card, CardActionArea, CardContent, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

const PersonalDetails = ({ login }) => (
  <Box margin={2}>
    {!login ? (
      <Card>
        <CardActionArea
          disabled={!login}
          sx={{
            '&.Mui-disabled': {
              cursor: 'not-allowed',
              pointerEvents: 'auto',
              color: 'rgba(0, 0, 0, 0.26)',
              boxShadow: 'none',
              backgroundColor: 'rgba(0, 0, 0, 0.12)',
            },
          }}
        >
          <CardContent>
            <Typography variant="button">Personal Details</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ) : (
      <Stack spacing={2}>
        <Typography variant="h5">Personal Details</Typography>
        <Card>
          <CardContent>
            <Stack my={1}>
              <Typography variant="button">Name</Typography>
              <Typography>Vickson Rodrigues</Typography>
            </Stack>
            <Divider />
            <Stack my={1}>
              <Typography variant="button">Contact Number</Typography>
              <Typography>9876543210</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    )}
  </Box>
);

export default PersonalDetails;
