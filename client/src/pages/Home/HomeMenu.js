import { Typography, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { ImageBackdrop, ImageButton, ImageSrc, ImageTitle } from '../../components/ComplexButton';
import SubWindow from '../../components/SubWindow';
import burgerMainMenu from '../../assests/MainMenu/burgerMainMenu.jpg';
import pastaMainMenu from '../../assests/MainMenu/pastaMainMenu.jpg';
import pizzaMainMenu from '../../assests/MainMenu/pizzaMainMenu.jpg';
import shakesMainMenu from '../../assests/MainMenu/shakesMainMenu.jpg';

const menu = [
  {
    title: 'Burger',
    imgSrc: burgerMainMenu,
    link: 'burger',
  },
  {
    title: 'Pizza',
    imgSrc: pastaMainMenu,
    link: 'pizza',
  },
  {
    title: 'Pasta',
    imgSrc: pizzaMainMenu,
    link: 'pasta',
  },
  {
    title: 'Beverage',
    imgSrc: shakesMainMenu,
    link: 'beverage',
  },
];

const HomeMenu = () => (
  <SubWindow name="Menu">
    <Grid
      container
      direction={{ xs: 'column', md: 'row' }}
      justifyContent="center"
      alignItems="center"
      spacing={4}
    >
      {menu.map((menuItem) => (
        <Grid item md={3} key={menuItem.title} width="70%" height="250px">
          <ImageButton
            component={Link}
            to="/menu"
            state={menuItem.link}
            sx={{
              color: 'text.primary',
              borderRadius: '25px ',
              width: '100%',
              height: '100%',
              '&:hover, &.Mui-focusVisible': {
                border: '4px solid',
                borderColor: 'secondary.light',
              },
            }}
          >
            <ImageSrc
              style={{
                backgroundImage: `url(${menuItem.imgSrc})`,
                backgroundPosition: 'center 55%',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: '20px ',
              }}
            >
              <ImageBackdrop
                className="MuiImageBackdrop-root"
                sx={{
                  borderRadius: '20px ',
                }}
              />
              <ImageTitle sx={{ top: '35%', width: '100%' }}>
                <Typography
                  component="span"
                  variant="h3"
                  width={1}
                  color="secondary.light"
                  textAlign="center"
                  sx={{
                    position: 'relative',
                    textShadow: '4px 4px 4px #000000',
                    fontWeight: '500',
                  }}
                >
                  {menuItem.title}
                </Typography>
              </ImageTitle>
            </ImageSrc>
          </ImageButton>
        </Grid>
      ))}
    </Grid>
  </SubWindow>
);

export default HomeMenu;
