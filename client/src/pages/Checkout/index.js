import { Button, Card, CardContent, Grid, Switch, Typography } from '@mui/material';
import React from 'react';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';
import DeliveryAddress from './DeliveryAddress';
import PaymentMode from './PaymentMode';
import PersonalDetails from './PersonalDetails';
import YourCart from './YourCart';

const Checkout = () => {
  useTitle('RedPanda - Checkout');
  const [login, setLogin] = React.useState(false);

  const handleChange = (event) => {
    setLogin(event.target.checked);
  };

  return (
    <PageHeader pageName="Checkout">
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
    </PageHeader>
  );
};

export default Checkout;
