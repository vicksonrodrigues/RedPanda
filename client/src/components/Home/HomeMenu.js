import {
  Container,
  Stack,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Divider,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const menu = [
  {
    title: 'Burger',
    imgSrc: 'http://d3j0x1xj96q3am.cloudfront.net/MainMenu/burgerMainMenu.jpg',
    link: 'menu/burgers',
  },
  {
    title: 'Pizza',
    imgSrc: 'http://d3j0x1xj96q3am.cloudfront.net/MainMenu/pizzaMainMenu.jpg',
    link: 'menu/pizzas',
  },
  {
    title: 'Pasta',
    imgSrc: 'http://d3j0x1xj96q3am.cloudfront.net/MainMenu/pastaMainMenu.jpg',
    link: 'menu/pastas',
  },
  {
    title: 'Shakes',
    imgSrc: 'http://d3j0x1xj96q3am.cloudfront.net/MainMenu/shakesMainMenu.jpg',
    link: 'menu/shakes',
  },
];

const HomeMenu = () => (
  <Container
    sx={{
      postion: 'absolute',
      transform: 'translateY(-10%)',
      pt: 2,
    }}
  >
    <Divider />
    <Typography
      gutterBottom
      variant="h3"
      component="div"
      align="center"
      m={4}
      color="secondary.main"
    >
      Our Menu
    </Typography>
    <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>
      {menu.map((menuItem) => (
        <Card key={menuItem.title} sx={{ width: 300, height: 300 }}>
          <CardActionArea sx={{ height: '100%' }} component={Link} to={menuItem.link}>
            <CardContent
              sx={{
                height: '100%',
                backgroundImage: `url(${menuItem.imgSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 55%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                gutterBottom
                variant="h3"
                align="center"
                color="secondary.light"
                sx={{ textShadow: '2px 2px 4px #000000' }}
              >
                {menuItem.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  </Container>
);

export default HomeMenu;
