import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';
import { removeItem } from '../../features/cart/cartSlice';
import ItemDialog from '../../components/ItemDialog';
import PandaInBag from '../../assests/PageImages/redPandaInBag.png';
import ItemQuantityButtons from '../../components/ItemQuantityButtons';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleteItem = () => {
    dispatch(removeItem({ id: item.id }));
  };
  return (
    <TableRow>
      <TableCell align="center">
        <IconButton onClick={handleDeleteItem}>
          <DeleteOutlineIcon />
        </IconButton>
      </TableCell>
      <TableCell onClick={handleOpen} align="center">
        <IconButton>
          <Avatar src={item.img} alt={item.dishName} sx={{ width: 70, height: 70 }} />
        </IconButton>
      </TableCell>
      <TableCell align="center" onClick={handleOpen}>
        <Button sx={{ typography: 'subtitle2', fontSize: '18px' }} color="secondary">
          {item.dishName}
        </Button>
      </TableCell>
      <TableCell align="center" sx={{ fontSize: '18px' }}>
        <CurrencyRupeeIcon fontSize="small" />
        {item.price}
      </TableCell>
      <TableCell align="center">
        <ItemQuantityButtons
          isItemDialog={false}
          initialQuantity={item.quantity}
          menuItem={item}
          handleClose={false}
        />
      </TableCell>
      <TableCell align="center" sx={{ fontSize: '18px' }}>
        <CurrencyRupeeIcon fontSize="small" />
        {item.totalCost}
      </TableCell>
      <ItemDialog id={item.id} open={open} handleClose={handleClose} />
    </TableRow>
  );
};

const Cart = () => {
  useTitle('RedPanda - Cart');
  const cartList = useSelector((state) => state.cart);

  const subtotal = cartList
    .map(({ totalCost }) => totalCost)
    .reduce((sum, i) => Number(sum) + Number(i), 0);

  return (
    <PageHeader pageName="Your Cart">
      {cartList?.length > 0 ? (
        <Box p={3}>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell align="center" sx={{ typography: 'h6' }}>
                    Product
                  </TableCell>
                  <TableCell align="center" sx={{ typography: 'h6' }}>
                    Price
                  </TableCell>
                  <TableCell align="center" sx={{ typography: 'h6' }}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" sx={{ typography: 'h6' }}>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartList.map((item) => (
                  <CartItem item={item} key={item.dishName} />
                ))}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell colSpan={4} sx={{ border: 0 }} />
                  <TableCell align="center" sx={{ typography: 'h5' }}>
                    Total
                  </TableCell>
                  <TableCell align="center" sx={{ typography: 'h5' }}>
                    <CurrencyRupeeIcon />
                    {subtotal.toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box display="flex" justifyContent="flex-end" py={3} px={2} borderTop={1}>
            <Button variant="contained" component={Link} to="/checkout">
              Proceed To Checkout
            </Button>
          </Box>
        </Box>
      ) : (
        <Grid container direction="column" justifyContent="center" alignItems="center" height={600}>
          <Grid item>
            <img src={`${PandaInBag}`} alt="Panda in bag" height="350" />
          </Grid>
          <Grid item pb={3}>
            <Typography variant="h2" color="secondary.light" fontWeight="bold">
              Oops!!... Your cart is empty!
            </Typography>
          </Grid>
          <Grid item p={1}>
            <Typography
              variant="subtitle2"
              fontSize={20}
              color="primary.light"
            >{`Looks like you haven't added anything to your cart`}</Typography>
          </Grid>
          <Grid item m={3}>
            <Button variant="contained" component={Link} to="/menu">
              Go to Menu
            </Button>
          </Grid>
        </Grid>
      )}
    </PageHeader>
  );
};

export default Cart;
