import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActions,
  Button,
  IconButton,
} from '@mui/material';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import React from 'react';
import BuyItem from './BuyItem';

const Item = ({ item }) => {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);

  const handleAdd = () => {
    setQuantity((prevActiveStep) => prevActiveStep + 1);
  };
  const handleRemove = () => {
    setQuantity((prevActiveStep) => prevActiveStep - 1);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Card sx={{ display: 'flex', flexDirection: 'column' }}>
        <Avatar
          variant="square"
          sx={{
            position: 'absolute',
            bgcolor: 'secondary.main',
            transform: 'translateY(25%)',
            width: 50,
            height: 30,
            ml: 2,
          }}
        >
          <Typography variant="subtitle2">NEW</Typography>
        </Avatar>
        <CardMedia
          component="img"
          height="200"
          // eslint-disable-next-line global-require
          // eslint-disable-next-line global-require
          image={require('../../assests/Carousel/burger.jpg')}
          alt="green iguana"
        />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Avatar
            sx={{
              position: 'absolute',
              bgcolor: 'secondary.main',
              transform: 'translateY(-5%)',
              width: 50,
              height: 50,
            }}
          >
            <Typography>${item.price}</Typography>
          </Avatar>
        </Box>
        <CardContent sx={{ height: 150 }}>
          <Typography gutterBottom variant="h5" textAlign="center" m={2}>
            {item.dishName}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" onClick={handleOpen} variant="contained">
            Buy
          </Button>
          {quantity > 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pr: 3,
                justifyContent: 'flex-end',
                width: 1,
              }}
            >
              <IconButton aria-label="add" onClick={handleAdd}>
                <AddCircleOutlineOutlinedIcon />
              </IconButton>
              <Typography>{quantity}</Typography>
              <IconButton aria-label="remove" onClick={handleRemove}>
                <RemoveCircleOutlineOutlinedIcon />
              </IconButton>
            </Box>
          ) : (
            <div />
          )}
        </CardActions>
      </Card>

      <BuyItem
        open={open}
        handleClose={handleClose}
        item={item}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  );
};

export default Item;
