import React from 'react';
import { Button, Collapse, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Items from './Items';
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
    <Grid item display="flex" alignItems="center" justifyContent="center">
      {activeStep !== menuItem.name ? (
        <Paper
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ImageButton
            component={Link}
            to={`/menu/${menuItem.name}`}
            onClick={() => handleImageButton(menuItem.name)}
            sx={{
              display: 'flex',
              color: 'text.primary',
              height: '100%',
              width: 150,
              '& .MuiTypography-root': {
                backgroundColor: 'neutral.main',
                borderTop: '2px solid currentColor',
                borderBottom: '2px solid currentColor',
              },
            }}
          >
            <ImageSrc
              style={{
                backgroundImage: `url(${menuItem.img})`,
                backgroundPosition: '35% 100%',
              }}
            />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <ImageTitle>
              <Typography
                component="span"
                variant="h4"
                color="secondary.light"
                sx={{
                  position: 'relative',
                  letterSpacing: 4,
                  fontWeight: 'bold',
                  width: 150,
                  textAlign: 'center',

                  textShadow: '4px 4px 4px #000000',
                  py: '15px',
                }}
              >
                {menuItem.title}
              </Typography>
            </ImageTitle>
          </ImageButton>
        </Paper>
      ) : (
        <div />
      )}
      {activeStep === menuItem.name ? (
        <Collapse orientation="horizontal" in unmountOnExit>
          <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {activeStep !== 'burgers' ? (
              <Button
                onClick={handleBack}
                sx={{ color: 'text.primary' }}
                component={Link}
                to={`/menu/${subMenu[index - 1].name}`}
              >
                <ArrowBackIosRoundedIcon />
              </Button>
            ) : (
              <div />
            )}
            <Items menuItem={menuItem} index={index} />
            {activeStep !== 'shakes' ? (
              <Button
                onClick={handleNext}
                sx={{ color: 'text.primary' }}
                component={Link}
                to={`/menu/${subMenu[index + 1].name}`}
              >
                <ArrowForwardIosRoundedIcon />
              </Button>
            ) : (
              <div />
            )}
          </Paper>
        </Collapse>
      ) : (
        <div />
      )}
    </Grid>
  );
};

export default SubMenu;
