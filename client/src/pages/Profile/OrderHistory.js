import { Box, Typography, Paper, Stack, Pagination, Button, Grid, Divider } from '@mui/material';
import React from 'react';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import dayjs from 'dayjs';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ProfileSubHeader from '../../components/ProfileSubHeader';
import { useGetCustomerQuery } from '../../features/customer/customerApiSlice';

const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(localizedFormat);

const Order = ({ order }) => (
  <Grid
    width="100%"
    height="100%"
    container
    item
    direction="column"
    component={Paper}
    p={2}
    mb={2}
    position="relative"
    elevation={10}
    borderRadius={5}
  >
    <Grid
      item
      borderBottom={1}
      borderColor="divider"
      marginBottom={1}
      width="65%"
      py={0.5}
      display="flex"
      typography="subtitle2"
    >
      Order ID:
      <Typography pl={1}>#{order.orderNo}</Typography>
    </Grid>
    <Box
      sx={{
        height: '60px',
        p: 1,
        position: 'absolute',
        inset: '25px -10px auto auto',
        backgroundColor: 'secondary.main',
        boxShadow: '0px -10px 0 inset ',
        borderRadius: '5px 5px 0 0',
        clipPath:
          'polygon(0 0,100% 0 ,100% calc(100% - 10px),calc(100% - 10px) 100%,calc(100% - 10px) calc(100% - 11px),0 calc(100% - 11px))',
      }}
    >
      <Typography variant="h6">{order.orderStatus}</Typography>
    </Box>
    <Grid item fontWeight="bold" display="flex" flexDirection="column" width="100%">
      Items:
      <Stack width="100%" p={2}>
        {order.orderItems.map((i) => (
          <Box key={i.dishName} py={1} display="flex" flexDirection="column">
            <Typography variant="button" color="secondary.main" pb={1}>
              {i.dishName}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography display="flex" alignItems="center" pb={1}>
                {i.quantity} x <CurrencyRupeeIcon fontSize="small" /> {i.price}
              </Typography>
              <Typography display="flex" alignItems="center" pb={1}>
                <CurrencyRupeeIcon fontSize="small" /> {i.totalCost}
              </Typography>
            </Box>
            <Divider />
          </Box>
        ))}
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: 'column-reverse', md: 'row' }}
        >
          <Box display="flex" flexDirection="column" my={1} width={{ xs: '100%', md: '50%' }}>
            <Box fontWeight="bold" display="flex">
              Date:
              <Typography ml={1}>
                {dayjs(`${order.createdAt}`).format('LL')} at{' '}
                {dayjs(`${order.createdAt}`).format('LT')}
              </Typography>
            </Box>
            <Box fontWeight="bold" display="flex">
              Payment Mode:
              <Typography ml={1}>{order.paymentMode}</Typography>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" width={{ xs: '100%', md: '50%' }}>
            <Box
              fontWeight="bold"
              display="flex"
              alignSelf="flex-end"
              justifyContent="flex-end"
              mb={1}
              pb={1}
              width={{ xs: '100%', md: '75%' }}
              borderBottom={1}
              borderColor="divider"
            >
              Item Total:
              <Typography ml={1} display="flex" alignItems="center">
                <CurrencyRupeeIcon fontSize="small" />
                {order.subTotal.toFixed(2)}
              </Typography>
            </Box>
            <Box
              fontWeight="bold"
              display="flex"
              alignSelf="flex-end"
              justifyContent="flex-end"
              mb={1}
              pb={1}
              width={{ xs: '100%', md: '75%' }}
              borderBottom={1}
              borderColor="divider"
            >
              Delivery Cost:
              <Typography ml={1} display="flex" alignItems="center">
                <CurrencyRupeeIcon fontSize="small" />
                {order.deliveryCost.toFixed(2)}
              </Typography>
            </Box>
            <Box
              fontWeight="bold"
              display="flex"
              alignSelf="flex-end"
              justifyContent="flex-end"
              mb={1}
              pb={1}
              width={{ xs: '100%', md: '75%' }}
            >
              Total Amount:
              <Typography ml={1} display="flex" alignItems="center">
                <CurrencyRupeeIcon fontSize="small" />
                {order.totalCost.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Grid>
    <Box display="flex" justifyContent="flex-end" mt={1}>
      <Button variant="contained" color="secondary" startIcon={<ReceiptLongIcon />}>
        Download Receipt
      </Button>
    </Box>
  </Grid>
);

const OrderHistory = ({ value, index, customerAuth }) => {
  const { currentOrderList, perviousOrderList } = useGetCustomerQuery(customerAuth?.id, {
    selectFromResult: ({ data, isSuccess }) => ({
      currentOrderList: data?.orders?.filter((order) => order.orderStatus !== 'Delivered'),
      perviousOrderList: data?.orders?.filter((order) => order.orderStatus === 'Delivered'),
      data,
      isSuccess,
    }),
  });

  const itemsPerPage = 3;
  let noOfPages;
  const [page, setPage] = React.useState(1);
  if (perviousOrderList) {
    noOfPages = Math.ceil(perviousOrderList.length / itemsPerPage);
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && (
        <ProfileSubHeader title="Orders">
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
            <Grid container direction="column" alignItems="center" justifyContent="space-around">
              {currentOrderList?.length > 0 ? (
                currentOrderList.map((orderItem) => (
                  <Order key={orderItem?.orderNo} order={orderItem} />
                ))
              ) : (
                <Grid item component={Paper} p={2} variant="outlined" width={1}>
                  <Typography>No Orders here</Typography>
                </Grid>
              )}
            </Grid>
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
            {perviousOrderList?.length > 0 ? (
              <div>
                <Stack
                  component={Paper}
                  p={2}
                  spacing={2}
                  variant="outlined"
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  {perviousOrderList
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((orderItem) => (
                      <Order key={orderItem?.orderNo} order={orderItem} />
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
              </div>
            ) : (
              <Box component={Paper} p={2} variant="outlined">
                <Typography>No Orders here</Typography>
              </Box>
            )}
          </Box>
        </ProfileSubHeader>
      )}
    </div>
  );
};

export default OrderHistory;
