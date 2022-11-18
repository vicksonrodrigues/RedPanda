import { Box, Button, Card, CardContent, Grid, Switch, Typography } from '@mui/material';
import React from 'react';
import DeliveryAddress from './DeliveryAddress';
import PaymentMode from './PaymentMode';
import PersonalDetails from './PersonalDetails';
import YourCart from './YourCart';

const Checkout = () => {
  const [login, setLogin] = React.useState(false);

  const handleChange = (event) => {
    setLogin(event.target.checked);
  };

  return (
    <Box p={2} height="auto">
      <Box display="flex" justifyContent="center" p={2} border={1} bgcolor="primary.main">
        <Typography variant="h4">Checkout</Typography>
      </Box>
      <Grid container spacing={4} p={3}>
        <Grid item xs={8}>
          <Switch checked={login} onChange={handleChange} />
          {!login ? (
            <Card>
              <CardContent
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography>To Place Your Order Now, Log in to Your Account</Typography>
                <Button variant="contained" sx={{ borderRadius: 10 }}>
                  Login To Place Order
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div />
          )}
          <PersonalDetails login={login} />
          <DeliveryAddress login={login} />
          <PaymentMode login={login} />
        </Grid>
        <Grid item xs={4}>
          <YourCart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
