import { Grid } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import SubMenu from './SubMenu';
import Burger from '../../assests/MenuImage/burger03.png';
import Pizza from '../../assests/MenuImage/pizza01.png';
import Pasta from '../../assests/MenuImage/pasta02.png';
import Beverage from '../../assests/MenuImage/shakes01.png';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';

const subMenu = [
  {
    name: 'burger',
    title: 'Burger',
    img: Burger,
  },
  {
    name: 'pizza',
    title: 'Pizza',
    img: Pizza,
  },
  {
    name: 'pasta',
    title: 'Pasta',
    img: Pasta,
  },
  {
    name: 'beverage',
    title: 'Beverage',
    img: Beverage,
  },
];

const MenuPage = () => {
  useTitle('RedPanda - Menu');

  const { state } = useLocation();
  const initialState = state !== null ? state : 'burger';
  const [activeStep, setActiveStep] = React.useState(initialState);

  return (
    <PageHeader pageName="Our Menu">
      <Grid
        container
        direction={{ xs: 'coulmn', md: 'row' }}
        width={1}
        height={1}
        alignItems="stretch"
        justifyContent="space-evenly"
        p={2}
      >
        {subMenu.map((menuItem, index) => (
          <SubMenu
            key={menuItem.name}
            menuItem={menuItem}
            index={index}
            subMenu={subMenu}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        ))}
      </Grid>
    </PageHeader>
  );
};

export default MenuPage;
