import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  Card,
  Avatar,
  Button,
  CardActions,
  CardActionArea,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import ItemDialog from './ItemDialog';
import ItemQuantityButtons from './ItemQuantityButtons';

const ItemCard = ({ singleItem }) => {
  const [open, setOpen] = React.useState(false);
  const item = useSelector((state) => state.cart.filter((item) => item.id === singleItem.id));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Card
        sx={{
          height: '100%',
          width: '100%',
          backgroundColor: 'primary.dark',
          borderRadius: '20px',
          border: '4px inset',
          borderColor: 'secondary.light',
        }}
      >
        <CardActionArea
          onClick={handleOpen}
          sx={{
            '&:hover .MuiCardActionArea-focusHighlight': {
              opacity: 0.3,
            },
          }}
        >
          {singleItem.newLaunch && (
            <Avatar
              variant="square"
              sx={{
                position: 'absolute',
                bgcolor: 'neutral.main',
                transform: 'translateY(35%)',
                width: 50,
                height: 30,
                ml: 2,
              }}
            >
              <Typography variant="subtitle2" color="secondary.light">
                NEW
              </Typography>
            </Avatar>
          )}
          <CardMedia
            component="img"
            width="100%"
            height="100%"
            src={singleItem.img}
            alt={singleItem.dishName}
            sx={{
              objectFit: 'contain',
            }}
          />
          <Box display="flex" justifyContent="center" alignItems="center">
            <Avatar
              sx={{
                position: 'absolute',
                bgcolor: 'neutral.main',
                transform: 'translateY(-5%)',
                width: 60,
                height: 60,
                border: '2px solid',
                borderColor: 'secondary.light',
              }}
            >
              <Typography variant="subtitle2" color="secondary.light">
                &#x20B9;{singleItem.price}
              </Typography>
            </Avatar>
          </Box>
          <CardContent
            sx={{
              borderTop: '2px solid',
              borderBottom: '2px solid',
              borderColor: 'secondary.light',
              px: '0px',
              pb: '0px',
              backgroundColor: 'primary.main',
            }}
          >
            <Box height={70} display="flex" alignItems="flex-end" justifyContent="center">
              <Box
                height={60}
                width="100%"
                p={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography
                  gutterBottom
                  sx={{ typography: { xs: 'caption', lg: 'subtitle2' } }}
                  textAlign="center"
                  color="secondary.light"
                >
                  {singleItem.dishName}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box width={1} display="flex" px={1}>
            {item.length > 0 ? (
              <ItemQuantityButtons initialQuantity={item[0]?.quantity} menuItem={item[0]} />
            ) : (
              <Button onClick={handleOpen} variant="contained" color="secondary">
                Buy
              </Button>
            )}
          </Box>
        </CardActions>
      </Card>
      <ItemDialog open={open} handleClose={handleClose} id={singleItem.id} />
    </div>
  );
};

export default ItemCard;
