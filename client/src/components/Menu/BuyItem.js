/* eslint-disable no-underscore-dangle */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Tab,
  Tabs,
  Typography,
  Paper,
} from '@mui/material';
import React, { useState } from 'react';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import CustomizePanel from './CustomizePanel';

const BuyItem = ({ item, quantity, setQuantity, open, handleClose }) => {
  const [disabled, setDisabled] = useState(true);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
      <DialogContent sx={{ display: 'flex' }}>
        <Box
          component="img"
          src={item.img}
          alt={item.dishName}
          sx={{ width: '50%', display: 'flex', objectFit: 'cover' }}
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
            <Typography pb={1} variant="subtitle1" textAlign="left" sx={{ fontWeight: 'bold' }}>
              Customization :
            </Typography>
            <Box
              sx={{
                bgcolor: 'transparent',
                display: 'flex',
                py: 1,
              }}
            >
              <Tabs
                orientation="vertical"
                TabIndicatorProps={{ style: { display: 'none' } }}
                textColor="secondary"
                value={value}
                onChange={handleChange}
                sx={{
                  '& button.Mui-selected': {
                    backgroundColor: 'background.paper',
                    boxShadow: '-1px 3px 15px 1px black',
                    borderRadius: '10px 0px 0px 10px',
                  },
                }}
              >
                {item.customization.map((row) => (
                  <Tab label={row.cName} key={row.cName} sx={{ px: 4, ml: 3, mt: 2 }} />
                ))}
              </Tabs>
              {item.customization.map((panel, index) => (
                <CustomizePanel value={value} pIndex={index} panel={panel} key={panel.cName} />
              ))}
            </Box>
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

export default BuyItem;
