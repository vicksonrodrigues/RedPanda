import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';
import DeliveryAddress from './DeliveryAddress';
import PaymentMode from './PaymentMode';
import PersonalDetails from './PersonalDetails';
import YourCart from './YourCart';

import useAuth from '../../hooks/useAuth';
import { useAddOrderMutation } from '../../features/order/orderApiSlice';
import { setNotification } from '../../features/notification/notificationSlice';
import { clearCart } from '../../features/cart/cartSlice';

const Checkout = () => {
  useTitle('RedPanda - Checkout');

  const [addOrder, { isLoading, isSuccess }] = useAddOrderMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const notify = (notificationMessage, notificationType, notificationOpen = true) => {
    dispatch(
      setNotification({
        notificationOpen,
        notificationType,
        notificationMessage,
      }),
    );
  };

  const customer = useAuth();

  const cartList = useSelector((state) => state.cart);

  const [selectedPayment, setSelectedPayment] = useState('Pay on Delivery');

  const [specialInstruction, setSpecialInstruction] = useState();

  const [orderCost, setOrderCost] = useState(Number(0));

  const [deliveryAddress, setDeliveryAddress] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLoading) {
      const orderList = cartList.map(({ dishName, price, quantity, totalCost }) => ({
        dishName,
        price,
        quantity,
        totalCost,
      }));
      const newOrder = {
        customerId: customer.id,
        orderItems: orderList,
        deliveryAddress,
        subTotal: orderCost.subTotal,
        taxCost: orderCost.taxCost,
        deliveryCost: orderCost.deliveryCost,
        totalCost: orderCost.totalCost,
        paymentMode: selectedPayment === 'Pay on Delivery' ? 'Cash' : 'Online',
        specialNote: specialInstruction,
      };
      try {
        await addOrder(newOrder);
      } catch (err) {
        notify(`${err.data?.error}`);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setSelectedPayment('Pay on Delivery');
      setSpecialInstruction();
      setDeliveryAddress();
      setOrderCost();
      dispatch(clearCart());
      navigate('/confirmed');
    }
  }, [isSuccess]);
  return (
    <PageHeader pageName="Checkout">
      <Grid container spacing={4} p={3}>
        <Grid item xs={8}>
          {!customer ? (
            <Card>
              <CardContent
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Typography>To Place Your Order Now, Log in to Your Account</Typography>
                <Button
                  variant="contained"
                  sx={{ borderRadius: 10 }}
                  component={Link}
                  to="/login"
                  state={{ from: location }}
                >
                  Login To Place Order
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div />
          )}
          <PersonalDetails customer={customer} />
          <DeliveryAddress customer={customer} setDeliveryAddress={setDeliveryAddress} />
          <PaymentMode
            customer={customer}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
          {customer && (
            <Box display="flex" width={1} p={2} alignItems="center" justifyContent="flex-end">
              <Button variant="contained" color="secondary" onClick={handleSubmit}>
                Place your Order
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={4}>
          <YourCart
            cartList={cartList}
            specialInstruction={specialInstruction}
            setSpecialInstruction={setSpecialInstruction}
            setTotalCost={setOrderCost}
          />
        </Grid>
      </Grid>
    </PageHeader>
  );
};

export default Checkout;
