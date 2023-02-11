import {
  Avatar,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CartData from './data';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';

const CartItem = ({ item }) => (
  <TableRow>
    <TableCell>
      <IconButton>
        <CloseIcon />
      </IconButton>
    </TableCell>
    <TableCell>
      <Avatar src={item.Image} alt={item.Name} sx={{ width: 70, height: 70 }} />
    </TableCell>
    <TableCell>{item.Name}</TableCell>
    <TableCell>{item.Price}</TableCell>
    <TableCell>2</TableCell>
    <TableCell>{item.itemTotal}</TableCell>
  </TableRow>
);

const Cart = () => {
  useTitle('RedPanda - Cart');
  const TAX_RATE = 0.07;

  const ccyFormat = (num) => `${num.toFixed(2)}`;

  const priceCal = (Quantity, Price) => Quantity * Price;

  const createRow = ({ Name, Price, Quantity, Image }) => {
    const itemTotal = priceCal(Quantity, Price);
    return { Name, Price, Quantity, Image, itemTotal };
  };

  const rows = CartData.map((item) => createRow(item));

  const subtotal = (items) =>
    items.map(({ itemTotal }) => itemTotal).reduce((sum, i) => sum + i, 0);

  const invoiceSubtotal = subtotal(rows);
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = invoiceTaxes + invoiceSubtotal;
  return (
    <PageHeader pageName="Your Cart">
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <CartItem item={row} key={row.Name} />
            ))}
            <TableRow>
              <TableCell rowSpan={3} colSpan={3} sx={{ border: 0 }} />
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell>{ccyFormat(invoiceSubtotal)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tax</TableCell>
              <TableCell>{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
              <TableCell>{ccyFormat(invoiceTaxes)}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>{ccyFormat(invoiceTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box display="flex" justifyContent="space-between" py={3} px={12} borderTop={1}>
        <Box display="flex">
          <TextField label="Coupon Code" variant="outlined" size="small" />
          <Button variant="contained" sx={{ marginLeft: 3 }}>
            Apply Coupon
          </Button>
        </Box>
        <Box>
          <Button variant="contained">Proceed To Checkout</Button>
        </Box>
      </Box>
    </PageHeader>
  );
};

export default Cart;
