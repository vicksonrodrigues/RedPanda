import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
// import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import { ReactComponent as CheckListIcon } from '../../assests/Icons/checklist.svg';

const cartData = [
  {
    Name: 'Bacon Blue Cheese Burger with Caramelized Onions',
    Price: '13',
    Quantity: '4',
    Image:
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
  },
  {
    Name: 'Asparagus Potato Pizza',
    Price: '14',
    Quantity: '2',
    Image:
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
  },

  {
    Name: 'Easy Salmon Pasta',
    Price: '12',
    Quantity: '2',
    Image:
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
  },

  {
    Name: 'Banana Cream Pie Milkshake',
    Price: '14',
    Quantity: '3',
    Image:
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80',
  },
];

const YourCart = () => (
  <Stack spacing={2}>
    <Typography variant="h5">Your Cart</Typography>
    <Stack component={Paper} p={2} spacing={2}>
      <Box>
        {cartData.map((item) => (
          <Grid
            container
            borderBottom={1}
            my={1}
            py={1}
            borderColor="divider"
            sx={{
              '&.MuiGrid-container:last-child': {
                borderBottom: 'none',
              },
            }}
          >
            <Grid item xs={8}>
              <Typography variant="h6">{item.Name}</Typography>
            </Grid>
            <Grid item xs={4} justifyContent="end" display="flex">
              <Box
                border={1}
                display="inline-flex"
                borderRadius={5}
                justifyContent="center"
                alignItems="center"
                height={30}
              >
                <IconButton size="small" disableRipple>
                  <RemoveIcon />
                </IconButton>

                <Typography variant="subtitle2" mx={2}>
                  {item.Quantity}
                </Typography>
                <IconButton size="small" disableRipple>
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid
              item
              xs={8}
              justifyContent="start"
              alignItems="flex-start"
              display="flex"
              height={100}
            >
              <Button size="small" color="secondary">
                Customize
              </Button>
            </Grid>
            <Grid item xs={4} justifyContent="end" alignItems="flex-end" display="flex">
              <CurrencyRupeeIcon fontSize="small" />
              <Typography variant="subtitle2">{item.Price}</Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Box sx={{ bgcolor: 'secondary.light', p: 2 }}>
        <TextField
          placeholder="Special Instruction for your meal(optional)"
          fullWidth
          variant="standard"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <DescriptionIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Divider />
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Order Total</Typography>
          <Typography>1234</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Delivery Charges</Typography>
          <Typography>1234</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Taxes and Charges</Typography>
          <Typography>1234</Typography>
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
          <Typography variant="h6">4321</Typography>
        </Box>
      </Stack>
      <Stack>
        <Box display="flex" alignItems="center">
          <SvgIcon component={CheckListIcon} inheritViewBox />
          <Typography ml={1} variant="caption" fontWeight="bold">
            Review your order and address details to avoid cancellation of your order.
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="error">
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

export default YourCart;
