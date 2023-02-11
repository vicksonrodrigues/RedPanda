import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Avatar,
  Divider,
  Button,
  CardActions,
  IconButton,
} from '@mui/material';
import React from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import ItemDialog from './ItemDialog';

const ItemCard = ({ item, showQuantity }) => {
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
      <Card>
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
        <CardMedia component="img" height="200" src={item.img} alt={item.name} />
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
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" textAlign="center" m={2}>
            {item.name}
          </Typography>

          <Divider />
          <Typography variant="body2" color="text.secondary" m={1}>
            {item.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="medium" onClick={handleOpen} variant="contained">
            Buy
          </Button>
          {quantity > 0 && showQuantity ? (
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
      <ItemDialog
        open={open}
        handleClose={handleClose}
        item={item}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  );
};

export default ItemCard;
