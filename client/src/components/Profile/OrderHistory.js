import { Box, Typography, Paper, Stack, Pagination, Button } from '@mui/material';
import React from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Order = ({ orderItem }) => (
  <Box component={Paper} p={2} key={orderItem.orderID} position="relative" elevation={10}>
    <Typography borderBottom={1} borderColor="divider" marginBottom={1} width="75%">
      Order ID: #{orderItem.orderID}
    </Typography>
    <Box
      sx={{
        position: 'absolute',
        inset: '10px -10px auto auto',
        backgroundColor: 'secondary.main',
        padding: '10px 20px 20px 15px',
        boxShadow: '0px -10px 0 inset ',
        borderRadius: '3px 3px 0 0',
        clipPath:
          'polygon(0 0,100% 0 ,100% calc(100% - 10px),calc(100% - 10px) 100%,calc(100% - 10px) calc(100% - 11px),0 calc(100% - 11px))',
      }}
    >
      <Typography variant="subtitle2">Delivered</Typography>
    </Box>
    <Typography>Items:</Typography>
    <Stack direction="row" spacing={2} borderBottom={1} borderColor="divider">
      {orderItem.item.map((i) => (
        <Typography padding={1}>
          {i.quantity} x {i.name}
        </Typography>
      ))}
    </Stack>
    <Box display="flex" justifyContent="space-between" my={1}>
      <Typography>Ordered On: {orderItem.date}</Typography>
      <Typography>Total Amount: ${orderItem.amount}</Typography>
    </Box>
    <Box display="flex" justifyContent="flex-end" mt={5}>
      <Button variant="contained" color="secondary" startIcon={<ReceiptLongIcon />}>
        View Receipt
      </Button>
    </Box>
  </Box>
);

const ordersList = [
  {
    orderID: 5,
    projectName: 'score',
    item: [
      {
        name: 'Oreo Cheesecake Milkshake',
        quantity: 1,
      },
      {
        name: 'Fruity Pebble Milkshake',
        quantity: 2,
      },
    ],
    amount: 56,
    date: '10th Feb 2022',
  },
  {
    orderID: 10,
    projectName: 'score',
    item: [
      {
        name: 'Oreo Cheesecake Milkshake',
        quantity: 2,
      },
      {
        name: 'Fruity Pebble Milkshake',
        quantity: 2,
      },
    ],
    amount: 64,
    date: '10th Feb 2022',
  },
  {
    orderID: 15,
    projectName: 'score',
    item: [
      {
        name: 'Oreo Cheesecake Milkshake',
        quantity: 1,
      },
      {
        name: 'Fruity Pebble Milkshake',
        quantity: 2,
      },
    ],
    amount: 62,
    date: '10th Feb 2022',
  },
  {
    orderID: 20,
    projectName: 'score',
    item: [
      {
        name: 'Oreo Cheesecake Milkshake',
        quantity: 1,
      },
      {
        name: 'Fruity Pebble Milkshake',
        quantity: 2,
      },
    ],
    amount: 51,
    date: '10th Feb 2022',
  },
  {
    orderID: 25,
    projectName: 'score',
    item: [
      {
        name: 'Oreo Cheesecake Milkshake',
        quantity: 1,
      },
      {
        name: 'Fruity Pebble Milkshake',
        quantity: 2,
      },
    ],
    amount: 46,
    date: '10th Feb 2022',
  },
  {
    orderID: 30,
    projectName: 'score',
    item: [
      {
        name: 'Oreo Cheesecake Milkshake',
        quantity: 1,
      },
      {
        name: 'Fruity Pebble Milkshake',
        quantity: 2,
      },
    ],
    amount: 36,
    date: '10th Feb 2022',
  },
];

const OrderHistory = ({ value, index }) => {
  const itemsPerPage = 3;
  const currentorder = true;
  const [page, setPage] = React.useState(1);
  const noOfPages = Math.ceil(ordersList.length / itemsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && (
        <Box component={Paper} sx={{ m: 3, p: 3 }} border={1} borderColor="divider">
          <Box
            display="flex"
            justifyContent="flex-start"
            my={3}
            pb={1}
            borderBottom={1}
            borderColor="divider"
          >
            <Typography variant="h4">Order History</Typography>
          </Box>
          <Box>
            <Box
              display="flex"
              my={3}
              p={1}
              sx={{
                justifyContent: 'space-between',
                backgroundImage: 'linear-gradient(to top, rgb(168,118,62,0), rgb(168,118,62,1))',
              }}
            >
              <Typography variant="h5">Current Order</Typography>
            </Box>
            {currentorder ? (
              <Order orderItem={ordersList[0]} />
            ) : (
              <Box component={Paper} p={2} variant="outlined">
                <Typography>No Orders here</Typography>
              </Box>
            )}
          </Box>
          <Box>
            <Box
              display="flex"
              my={3}
              p={1}
              sx={{
                justifyContent: 'space-between',
                backgroundImage: 'linear-gradient(to top, rgb(168,118,62,0), rgb(168,118,62,1))',
              }}
            >
              <Typography variant="h5">Previous Order</Typography>
            </Box>
            <Stack
              component={Paper}
              p={2}
              spacing={2}
              variant="outlined"
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              {ordersList.slice((page - 1) * itemsPerPage, page * itemsPerPage).map((orderItem) => (
                <Order orderItem={orderItem} />
              ))}
            </Stack>
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Pagination
                count={noOfPages}
                page={page}
                onChange={handleChange}
                defaultPage={1}
                color="primary"
                size="small"
                showFirstButton
                showLastButton
              />
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default OrderHistory;
