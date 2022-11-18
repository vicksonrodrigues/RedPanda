import {
  Paper,
  Box,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  Radio,
  Stack,
  Typography,
  FormControlLabel,
} from '@mui/material';
import React from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const PayOnline = () => (
  <Box display="flex" alignItems="center">
    <AccountBalanceWalletIcon />
    <Box ml={1} flexDirection="column" display="flex">
      <Typography variant="button">Pay on Delivery</Typography>
      <Typography variant="caption">Cash</Typography>
    </Box>
  </Box>
);

const PayOnDelivery = () => (
  <Box display="flex" alignItems="center">
    <CreditCardIcon />
    <Box ml={1} flexDirection="column" display="flex">
      <Typography variant="button">Pay Online</Typography>
      <Typography variant="caption">Cards,Netbanking,UPI,Wallets</Typography>
    </Box>
  </Box>
);

const PaymentMode = ({ login }) => {
  const [selectedValue, setSelectedValue] = React.useState('Pay on Delivery');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
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
              <Typography variant="button">Choose Payment Mode</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Stack spacing={2}>
          <Typography variant="h5">Choose Payment Mode</Typography>
          <Stack spacing={2} border={1} p={1} borderColor="divider" borderRadius={2}>
            <FormControl
              component={Paper}
              sx={{
                py: 2,
                pr: 3,
                '&.MuiFormControl-root:hover': {
                  backgroundColor: 'text.disabled',
                },
              }}
              fullWidth
            >
              <FormControlLabel
                color="success"
                control={
                  <Radio
                    color="success"
                    checked={selectedValue === 'Pay on Delivery'}
                    onChange={handleChange}
                    value="Pay on Delivery"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'B' }}
                  />
                }
                label={<PayOnline />}
                labelPlacement="start"
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              />
            </FormControl>
            <FormControl
              component={Paper}
              sx={{
                py: 2,
                pr: 3,
                '&.MuiFormControl-root:hover': {
                  backgroundColor: 'text.disabled',
                },
              }}
              fullWidth
            >
              <FormControlLabel
                color="success"
                control={
                  <Radio
                    color="success"
                    checked={selectedValue === 'Pay Online'}
                    onChange={handleChange}
                    value="Pay Online"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                }
                label={<PayOnDelivery />}
                labelPlacement="start"
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              />
            </FormControl>
          </Stack>
        </Stack>
      )}
    </Box>
  );
};

export default PaymentMode;
