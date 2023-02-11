import { /* Button, */ Grid } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import SubMenu from './SubMenu';
import Burger from '../../assests/MenuImage/burger03.png';
import Pizza from '../../assests/MenuImage/pizza01.png';
import Pasta from '../../assests/MenuImage/pasta02.png';
import Shakes from '../../assests/MenuImage/shakes01.png';
import PageHeader from '../../components/PageHeader';
import useTitle from '../../hooks/useTitle';

const subMenu = [
  {
    name: 'burgers',
    title: 'Burger',
    img: Burger,
  },
  {
    name: 'pizzas',
    title: 'Pizza',
    img: Pizza,
  },
  {
    name: 'pastas',
    title: 'Pasta',
    img: Pasta,
  },
  {
    name: 'shakes',
    title: 'Shake',
    img: Shakes,
  },
];

const Menu = () => {
  useTitle('RedPanda - Menu');
  const { id } = useParams();
  const initialStep = id || 'burgers';

  const [activeStep, setActiveStep] = React.useState(initialStep);

  return (
    <PageHeader pageName="Our Menu">
      <Grid container sx={{ p: 2 }} width="1" wrap="nowrap" spacing={1}>
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

export default Menu;
