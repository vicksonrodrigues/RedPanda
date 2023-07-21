import React from 'react';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ItemList from './ItemList';
import { ImageBackdrop, ImageSrc, ImageButton, ImageTitle } from '../../components/ComplexButton';

const SubMenu = ({ menuItem, index, activeStep, setActiveStep, subMenu }) => {
  const handleNext = () => {
    setActiveStep(subMenu[index + 1].name);
  };

  const handleBack = () => {
    setActiveStep(subMenu[index - 1].name);
  };
  const handleImageButton = (name) => {
    setActiveStep(name);
  };

  return (
    <>
      {/* If SubMenu item is not selected */}
      {activeStep !== menuItem.name ? (
        <Grid
          item
          md={1}
          m={0.5}
          display="flex"
          justifyContent="center"
          component={Paper}
          height={{ xs: '70px', md: 'auto' }}
          minWidth="100px"
          width="100%"
        >
          <ImageButton
            onClick={() => handleImageButton(menuItem.name)}
            sx={{
              display: 'flex',
              color: 'text.primary',
              height: '100%',
              width: '100%',

              '& .MuiTypography-root': {
                backgroundColor: 'neutral.main',
                borderTop: '2px solid currentColor',
                borderBottom: '2px solid currentColor',
              },
            }}
          >
            <ImageSrc
              sx={{ display: { xs: 'none', md: 'block' } }}
              style={{
                backgroundImage: `url(${menuItem.img})`,
                backgroundPosition: '75% 100%',
              }}
            />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <ImageTitle sx={{ width: '100%', display: 'flex' }}>
              <Typography
                component="span"
                variant="h6"
                color="secondary.light"
                sx={{
                  position: 'relative',
                  letterSpacing: 1,
                  fontWeight: 'bold',
                  width: '100%',
                  textAlign: 'center',

                  textShadow: '4px 4px 4px #000000',
                  py: '15px',
                }}
              >
                {menuItem.title}
              </Typography>
            </ImageTitle>
          </ImageButton>
        </Grid>
      ) : (
        <Grid
          xl={8}
          lg={8}
          md={7}
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          component={Paper}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {activeStep !== 'burgers' ? (
            <IconButton onClick={handleBack} sx={{ color: 'text.primary' }}>
              <ArrowBackIosRoundedIcon />
            </IconButton>
          ) : (
            <div />
          )}
          {/* Display menu item card */}
          <ItemList menuItem={menuItem} index={index} />
          {activeStep !== 'shakes' ? (
            <IconButton onClick={handleNext} sx={{ color: 'text.primary' }}>
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          ) : (
            <div />
          )}
        </Grid>
      )}
      {/* If SubMenu item is selected */}
    </>
  );
};

export default SubMenu;
