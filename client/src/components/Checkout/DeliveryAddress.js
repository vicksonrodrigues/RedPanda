import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const addressList = [
  {
    id: '10',
    name: 'Home',
    address: 'A/204, Satya Sai Plaza, Sec 11, Panvel, Navi Mumbai,Maharashtra, India.',
  },
  {
    id: '12',
    name: 'Friend1',
    address:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    id: '13',
    name: 'Home2',
    address:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
  {
    id: '14',
    name: 'Office',
    address:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  },
];

const DeliveryAddress = ({ login }) => {
  const [selected, setSelected] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const addressLength = addressList.length;
  const handleSelection = (event, newFormats) => {
    setSelected(newFormats);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
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
              <Typography variant="button">Delivery Address</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Stack spacing={2}>
          <Typography variant="h5">Delivery Address</Typography>
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Box>
                  {addressLength !== 0 ? (
                    <Card variant="outlined">
                      <CardContent>
                        <Typography>{addressList[selected].address}</Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardActionArea onClick={handleClickOpen}>
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
                  )}
                </Box>
                {addressLength !== 0 ? (
                  <Box>
                    <Typography mb={1}>Saved Addresses:</Typography>
                    <ToggleButtonGroup
                      sx={{
                        '& .MuiToggleButtonGroup-grouped': {
                          margin: 1,
                          marginRight: 2,
                          border: 2,
                          '&:not(:first-of-type)': {
                            borderRadius: 4,
                            border: 2,
                          },
                          '&:first-of-type': {
                            borderRadius: 4,
                          },
                        },
                      }}
                      color="secondary"
                      value={selected}
                      onChange={handleSelection}
                      exclusive
                    >
                      {addressList.map((location, index) => (
                        <ToggleButton value={index} key={location.id}>
                          {location.name}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Box>
                ) : (
                  <div />
                )}

                {addressLength !== 0 ? (
                  <Button variant="contained" fullWidth onClick={handleClickOpen}>
                    Add new Address
                  </Button>
                ) : (
                  <div />
                )}
              </Stack>
            </CardContent>
          </Card>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Enter Address details</DialogTitle>
            <DialogContent>
              <Stack my={1} spacing={2}>
                <TextField
                  autoFocus
                  id="address"
                  label="Complete address"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  id="landmark"
                  label="Nearby landmark (optional)"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  id="name"
                  label="Address NickName/Title"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Stack>
            </DialogContent>
            <Divider variant="middle" />
            <DialogActions sx={{ my: 1 }}>
              <Button variant="contained" onClick={handleClose} fullWidth>
                Save Address
              </Button>
            </DialogActions>
          </Dialog>
        </Stack>
      )}
    </Box>
  );
};

export default DeliveryAddress;
