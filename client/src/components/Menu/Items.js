import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Item from './Item';
// import menuData from './data';
import menuService from '../../services/menus';

const Items = ({ menuItem }) => {
  const [menus, setMenus] = useState([]);
  console.log(menuItem);
  console.log(menus);
  useEffect(() => {
    menuService.getSubMenu(menuItem.name).then((initialEventList) => {
      setMenus(initialEventList);
    });
  }, []);
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={2}>
      <Typography variant="h4" m={2}>
        {menuItem.title}
      </Typography>
      <Grid container spacing={4}>
        {menus.map((item) => (
          <Grid item key={item.id} xs={4} display="flex">
            <Item item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Items;
