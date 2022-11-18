import React from 'react';
import { styled } from '@mui/material/styles';
import { Button, ButtonBase, Collapse, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Items from './Items';

const ImageButton = styled(ButtonBase)({
  position: 'relative',

  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      backgroundColor: 'black',
      border: '2px solid currentColor',
    },
  },
});

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: '35% 100%',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageTitle = styled('span')(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageTitleHyphen = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: 'currentcolor',
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

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
          elevation={(index + 1) * 4}
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
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${menuItem.img})` }} />
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
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {menuItem.title}
                <ImageTitleHyphen className="MuiImageMarked-root" />
              </Typography>
            </ImageTitle>
          </ImageButton>
        </Paper>
      ) : (
        <div />
      )}
      {activeStep === menuItem.name ? (
        <Collapse orientation="horizontal" in unmountOnExit>
          <Paper
            elevation={14}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
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
              <div style={{ display: 'none' }} />
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
