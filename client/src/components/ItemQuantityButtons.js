import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDispatch } from 'react-redux';
import { changeQuantity, removeItem } from '../features/cart/cartSlice';
import { setNotification } from '../features/notification/notificationSlice';

const ItemQuantityButtons = ({ initialQuantity, menuItem }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [openAlert, setOpenAlert] = React.useState(false);

  const notify = (notificationMessage, notificationType, notificationOpen = true) => {
    dispatch(
      setNotification({
        notificationOpen,
        notificationType,
        notificationMessage,
      }),
    );
  };

  // update quantity in global state based on add or remove
  useEffect(() => {
    if (initialQuantity > 0) {
      const updateQuantity = {
        id: menuItem.id,
        quantity: Number(quantity),
        totalCost: Number(menuItem.price * quantity).toFixed(2),
      };
      dispatch(changeQuantity(updateQuantity));
    }
  }, [quantity]);
  // update local quantity of the button
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);
  // useful in both cart and item Dialog
  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  // handle remove quantity to local state
  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      if (initialQuantity > 0 && quantity === 1) {
        setOpenAlert(true);
      }
      if (initialQuantity > 0 && quantity !== 1) {
        setQuantity((prevActiveStep) => prevActiveStep - 1);
      }
    }
  };
  // handle add quantity to local state
  const handleAddQuantity = () => {
    if (quantity >= 0) {
      setQuantity((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleDeleteItem = () => {
    setQuantity(0);
    dispatch(removeItem({ id: menuItem.id }));
    notify(`${menuItem.dishName} removed from cart`, 'error');
    handleAlertClose();
  };
  return (
    <Box
      display="inline-flex"
      borderRadius={5}
      justifyContent="center"
      alignItems="center"
      bgcolor="secondary.main"
    >
      {quantity === 1 && initialQuantity > 0 ? (
        <IconButton
          size="small"
          disableRipple
          onClick={handleRemoveQuantity}
          sx={{ color: 'white' }}
        >
          <DeleteOutlineIcon />
        </IconButton>
      ) : (
        <IconButton
          size="small"
          disableRipple
          onClick={handleRemoveQuantity}
          sx={{ color: 'white' }}
        >
          <RemoveIcon />
        </IconButton>
      )}

      <Typography variant="button" mx={2}>
        {quantity}
      </Typography>
      <IconButton size="small" disableRipple onClick={handleAddQuantity} sx={{ color: 'white' }}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={openAlert}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" typography="h6">
          Remove {menuItem.dishName} from cart ?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteItem} autoFocus variant="contained">
            Agree
          </Button>
          <Button onClick={handleAlertClose} variant="outlined">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ItemQuantityButtons;
