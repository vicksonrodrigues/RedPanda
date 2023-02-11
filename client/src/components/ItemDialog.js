import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
  Paper,
} from '@mui/material';
import React, { useState } from 'react';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CustomizationPanel from '../pages/Menu/CustomizationPanel';

const ItemDialog = ({ item, quantity, setQuantity, open, handleClose }) => {
  const [disabled, setDisabled] = useState(true);

  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity((prevActiveStep) => prevActiveStep - 1);
      if (quantity === 1) {
        setDisabled(true);
      }
    }
  };
  const handleAdd = () => {
    if (quantity >= 0) {
      setQuantity((prevActiveStep) => prevActiveStep + 1);
      if (quantity === 0) {
        setDisabled(false);
      }
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogContent
        sx={{
          display: 'flex',
          m: 2,
          '&::-webkit-scrollbar': {
            width: '12px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'secondary.main',
            borderRadius: '20px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'neutral.main',
            borderRadius: '20px',
            border: '3px solid ',
            borderColor: 'secondary.main',
          },
        }}
      >
        <Box
          component="img"
          src={item.img}
          alt={item.dishName}
          sx={{
            width: '50%',
            display: 'flex',
            objectFit: 'cover',
            alignContent: 'center',
          }}
        />
        <Box
          sx={{ width: '50%', mx: 3, p: 3 }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box width={1}>
            <Typography variant="h4" textAlign="center">
              {item.dishName}
            </Typography>
            <Typography py={3} sx={{ textAlignLast: 'center' }}>
              {item.description}
            </Typography>
            <CustomizationPanel customization={item.customization} />
            <Box component={Paper} height={70} p={1}>
              <Typography>Burger + sides</Typography>
            </Box>
          </Box>
          <Box>
            <Typography borderTop={1} textAlign="end" p={1}>
              Total - $ {item.price}
            </Typography>
            <DialogActions>
              <Button size="large" onClick={handleAdd} variant="contained" fullWidth>
                Add to Cart
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  width: 1,
                }}
              >
                <IconButton aria-label="add" onClick={handleAdd}>
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
                <Typography>{quantity}</Typography>

                <IconButton disabled={disabled} aria-label="remove" onClick={handleRemove}>
                  <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </DialogActions>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDialog;
