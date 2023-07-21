import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
// import menuData from './data';
import ItemCard from '../../components/ItemCard';
import { useGetMenuQuery } from '../../features/menu/menuApiSlice';

const Items = ({ menuItem }) => {
  const { menuItems } = useGetMenuQuery('menuList', {
    pollingInterval: 60000,
    selectFromResult: ({ data }) => ({
      menuItems: data?.filter((items) => items.subMenu === menuItem.name),
    }),
  });
  return (
    <Grid
      container
      display="flex"
      direction="column"
      alignItems="center"
      justifyContent="center"
      py={2}
    >
      {/* SubMenu Title eg: Burger */}
      <Grid item sx={{ mb: 3 }} justifyContent="center" width={1} height={80}>
        <Box
          component={Paper}
          bgcolor="secondary.light"
          p={2}
          alignContent="center"
          justifyContent="center"
          display="flex"
          borderRadius={5}
        >
          <Divider
            sx={{
              alignSelf: 'center',
              width: '100%',
              '&::before': {
                borderTop: '3px solid',
                borderColor: 'neutral.main',
              },
              '&::after': {
                borderTop: '3px solid',
                borderColor: 'neutral.main',
              },
            }}
          >
            <Typography variant="h4" color="neutral.main">
              {menuItem.title}
            </Typography>
          </Divider>
        </Box>
      </Grid>

      <Grid
        item
        container
        width={1}
        justifyContent="space-evenly"
        overflow="scroll"
        maxHeight="750px"
        sx={{
          scrollbarWidth: 'none',

          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {menuItems?.map((item) => (
          <Grid item key={item.id} xs={3} md={4} lg={3} display="flex" m={2}>
            <ItemCard singleItem={item} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
export default Items;
