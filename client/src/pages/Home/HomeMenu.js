import { Stack, Typography, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { ImageBackdrop, ImageButton, ImageSrc, ImageTitle } from '../../components/ComplexButton';
import SubWindow from '../../components/SubWindow';

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
  <SubWindow name="Menu">
    <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>
      {menu.map((menuItem) => (
        <Box key={menuItem.title}>
          <ImageButton
            component={Link}
            to={menuItem.link}
            sx={{
              display: 'flex',
              color: 'text.primary',
              height: 300,
              width: 300,
              borderRadius: '25px ',

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
                borderRadius: '20px ',
              }}
            >
              <ImageBackdrop
                className="MuiImageBackdrop-root"
                sx={{
                  borderRadius: '20px ',
                }}
              />
              <ImageTitle>
                <Typography
                  component="span"
                  variant="h3"
                  color="secondary.light"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height={300}
                  width={300}
                  sx={{
                    position: 'relative',
                    textShadow: '4px 4px 4px #000000',
                  }}
                >
                  {menuItem.title}
                </Typography>
              </ImageTitle>
            </ImageSrc>
          </ImageButton>
        </Box>
      ))}
    </Stack>
  </SubWindow>
);

export default HomeMenu;
