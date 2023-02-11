import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import menuData from './data';
import ItemCard from '../../components/ItemCard';
// import menuService from '../../services/menus';

const Items = ({ menuItem }) => (
  /* const [menus, setMenus] = useState([]);
  useEffect(() => {
    menuService.getSubMenu(menuItem.name).then((initialEventList) => {
      setMenus(initialEventList);
    });
  }, []); */
  <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={2}>
    <Typography variant="h4" m={2} color="secondary.light">
      {menuItem.title}
    </Typography>
    <Grid container spacing={4}>
      {menuData.map((item) => (
        <Grid item key={item.price} xs={4} display="flex">
          <ItemCard item={item} />
        </Grid>
      ))}
    </Grid>
  </Box>
);
export default Items;
