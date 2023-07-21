import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';

import { ReactComponent as CheckListIcon } from '../../assests/Icons/checklist.svg';

const YourCart = ({ cartList, specialInstruction, setSpecialInstruction, setTotalCost }) => {
  const subtotal = cartList
    .map(({ totalCost }) => totalCost)
    .reduce((sum, i) => Number(sum) + Number(i), 0);
  const TAX_RATE = 0.2;
  const deliveryTotal = 20;

  const invoiceSubtotal = subtotal;
  const invoiceTaxes = TAX_RATE * invoiceSubtotal;
  const invoiceTotal = deliveryTotal + invoiceTaxes + invoiceSubtotal;

  const handleSpecialInstruction = (event) => {
    setSpecialInstruction(event.target.value);
  };

  useEffect(() => {
    const totalCost = {
      subTotal: invoiceSubtotal.toFixed(2),
      taxCost: invoiceTaxes.toFixed(2),
      deliveryCost: deliveryTotal.toFixed(2),
      totalCost: invoiceTotal.toFixed(2),
    };
    setTotalCost(totalCost);
  }, []);

  return (
    <Stack spacing={2} width="100%" position="relative">
      <Typography variant="h3" textAlign="center">
        Order Summary
      </Typography>
      <Stack component={Paper} p={2} spacing={2} elevation={8}>
        <Box>
          {cartList.map((item) => (
            <Grid
              key={item.id}
              container
              borderBottom={1}
              my={1}
              py={1}
              borderColor="divider"
              justifyContent="space-evenly"
              sx={{
                '&.MuiGrid-container:last-child': {
                  borderBottom: 'none',
                },
              }}
            >
              <Grid item xs={2} mr={3}>
                <Avatar
                  variant="rounded"
                  src={item.img}
                  alt={item.dishName}
                  sx={{ height: '80px', width: '100%' }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="button">{item.dishName}</Typography>
                <Typography variant="subtitle2" color="text.disabled">
                  Price: <CurrencyRupeeIcon sx={{ height: '12px', width: '12px' }} />
                  {item.price}
                </Typography>
                <Typography variant="subtitle2" color="text.disabled">
                  Quantity: x{item.quantity}
                </Typography>
              </Grid>
              <Grid item xs={2} justifyContent="end" alignItems="center" display="flex">
                <CurrencyRupeeIcon fontSize="small" />
                <Typography variant="subtitle2">{item.totalCost}</Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
        {/* Special Instruction */}
        <Box
          sx={{
            bgcolor: 'secondary.light',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DescriptionIcon sx={{ color: 'action.active', mr: 1 }} />
          <TextField
            value={specialInstruction}
            onChange={handleSpecialInstruction}
            label="Special Instruction (optional)"
            multiline
            fullWidth
            variant="filled"
            InputProps={{
              disableUnderline: true,
            }}
          />
        </Box>
        <Divider />
        {/* Cost Calculation and display */}
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between">
            <Typography>Order Total</Typography>
            <Typography>
              <CurrencyRupeeIcon fontSize="small" />
              {subtotal.toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Delivery Charges</Typography>
            <Typography>
              <CurrencyRupeeIcon fontSize="small" />
              {deliveryTotal.toFixed(2)}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography>Taxes and Charges</Typography>
            <Typography>
              <CurrencyRupeeIcon fontSize="small" />
              {invoiceTaxes.toFixed(2)}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            borderTop={1}
            borderBottom={1}
            py={1}
            borderColor="divider"
          >
            <Typography variant="h6">Total Payable</Typography>
            <Typography variant="h6">
              <CurrencyRupeeIcon fontSize="small" />
              {invoiceTotal.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
        {/* Bottom Notes */}
        <Stack>
          <Box display="flex" alignItems="center">
            <SvgIcon component={CheckListIcon} inheritViewBox />
            <Typography ml={1} variant="caption" fontWeight="bold">
              Review your order and address details to avoid cancellation of your order.
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="error" pr={1}>
              Note:
            </Typography>
            <Typography variant="caption">
              If you choose to cancel your order, you can do it only within 60 seconds after placing
              your order.
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default YourCart;
