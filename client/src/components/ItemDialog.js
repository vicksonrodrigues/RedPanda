import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  // Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { useDispatch, useSelector } from 'react-redux';
// import CustomizePanel from './CustomizePanel';
import { useTheme } from '@mui/material/styles';
import { addItem, removeItem } from '../features/cart/cartSlice';
import { useGetMenuQuery } from '../features/menu/menuApiSlice';
import ItemQuantityButtons from './ItemQuantityButtons';
import { setNotification } from '../features/notification/notificationSlice';

const ItemDialog = ({ id, open, handleClose }) => {
  const { menuItem } = useGetMenuQuery('menuList', {
    selectFromResult: ({ data }) => ({
      menuItem: data?.find((items) => items.id === id),
    }),
  }); // find item details
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
  // find if the item is in global state
  const itemInCart = useSelector((state) => state.cart?.filter((item) => item.id === menuItem?.id));

  // used for setting the local quantity according to global state or 1
  const initialQuantity = itemInCart[0] ? itemInCart[0].quantity : 1;
  const [disabled, setDisabled] = useState(!itemInCart[0]);
  const [quantity, setQuantity] = React.useState(initialQuantity);
  const [openAlert, setOpenAlert] = React.useState(false);

  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!itemInCart[0]) {
      setDisabled(true);
    }
    setQuantity(initialQuantity);
  }, [handleClose]);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };
  const handleDeleteItem = () => {
    dispatch(removeItem({ id: menuItem.id }));
    setDisabled(true);
    setQuantity(1);
    handleAlertClose();
    handleClose();
  };

  const handleRemove = () => {
    if (itemInCart?.length > 0 && quantity === 1) {
      setOpenAlert(true);
    }
    if (quantity > 1) {
      setQuantity((prevActiveStep) => prevActiveStep - 1);
      if (itemInCart?.length === 0 && quantity === 2) {
        setDisabled(true);
      }
    }
  };
  const handleAdd = () => {
    if (quantity >= 0) {
      setQuantity((prevActiveStep) => prevActiveStep + 1);
      if (quantity === 1) {
        setDisabled(false);
      }
    }
  };

  const handleBuy = (event) => {
    event.preventDefault();
    if (itemInCart.length === 0) {
      const itemDetails = {
        id: menuItem.id,
        dishName: menuItem.dishName,
        price: menuItem.price,
        img: menuItem.img,
        quantity,
        totalCost: Number(menuItem.price * quantity).toFixed(2),
      };
      dispatch(addItem(itemDetails));
      notify(`${menuItem.dishName} added to cart`, 'success');
      if (quantity === 1) {
        setDisabled(false);
      }
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          p: { xs: 0, sm: 3 },
          '&::-webkit-scrollbar': {
            width: { xs: '0px', sm: '12px' },
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'secondary.main',
            borderRadius: '20px',
            my: '45px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'neutral.main',
            borderRadius: '20px',
            border: '3px solid ',
            borderColor: 'secondary.main',
          },
        }}
      >
        {/* Image in Dialog box */}
        <Box
          sx={{
            display: 'flex',
            objectFit: 'contain',
            objectPosition: 'center',
            justifyContent: 'center',
            mt: { xs: 3, sm: 0 },
            px: { xs: 1, sm: 0 },
          }}
        >
          <img
            src={menuItem?.img}
            alt={menuItem?.dishName}
            width={matchDownMd ? '70%' : '100%'}
            height="auto"
          />
        </Box>
        {/* Side Bar */}
        <Box
          sx={{ width: { xs: '100%', sm: '50%' }, mx: { xs: 0, sm: 3 }, p: { xs: 0, sm: 3 } }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {/* Cancel Button */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 1,
              top: 8,
              color: (theme) => theme.palette.grey[700],
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* Item Details and Customization */}
          <Box width={1}>
            <Typography
              variant="h4"
              textAlign="center"
              color="secondary.light"
              pt={{ xs: 3, sm: 0 }}
              px={{ xs: 1, sm: 0 }}
            >
              {menuItem?.dishName}
            </Typography>
            <Typography
              pt={3}
              px={{ xs: 1, sm: 0 }}
              sx={{ textAlign: 'left', fontSize: { xs: '12px', sm: '16px' } }}
            >
              {menuItem?.description}
            </Typography>
            <Typography
              py={3}
              px={{ xs: 1, sm: 0 }}
              sx={{ textAlignLast: 'left', textAlign: 'center' }}
            >
              Price: &#x20B9;
              {menuItem?.price}
            </Typography>
          </Box>
          {/* Item Quantity ,total Cost and Action Button */}
          <Box>
            <Typography borderTop={1} textAlign="end" p={1} mx={{ xs: 1, sm: 0 }}>
              Total - &#x20B9;
              {(menuItem ? menuItem.price * quantity : 0).toFixed(2)}
            </Typography>
            <DialogActions sx={{ display: 'flex', px: { xs: 1, sm: 0 } }}>
              {!itemInCart[0] ? (
                <>
                  <Button size="large" onClick={handleBuy} variant="contained">
                    Add to Cart
                  </Button>
                  <Box
                    sx={{
                      width: '120px',
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: 5,
                      justifyContent: 'space-between',
                      bgcolor: 'secondary.main',
                      ml: '16px',
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{ color: 'white' }}
                      disabled={disabled}
                      onClick={handleRemove}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="button">{quantity}</Typography>
                    <IconButton
                      size="small"
                      sx={{ color: 'white' }}
                      onClick={handleAdd}
                      color="secondary"
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <ItemQuantityButtons initialQuantity={initialQuantity} menuItem={menuItem} />
              )}
            </DialogActions>
          </Box>
        </Box>
      </DialogContent>
      <Dialog
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remove the {menuItem?.dishName} from cart ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleAlertClose}>Disagree</Button>
          <Button onClick={handleDeleteItem} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default ItemDialog;
