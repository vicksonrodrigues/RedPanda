import { Box, Container, Grid, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React from 'react';
import Carousel from 'react-material-ui-carousel';

import useTitle from '../../hooks/useTitle';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import loginPic1 from '../../assests/LoginMsg/login1.jpeg';
import loginPic2 from '../../assests/LoginMsg/login2.jpeg';
import loginPic3 from '../../assests/LoginMsg/login3.jpeg';

const sidebar = [
  {
    img: `${loginPic1}`,
    msg: 'Life is too short to eat boring food.',
    title: 'Burger',
  },
  {
    img: `${loginPic2}`,
    msg: 'Sip, savor, and celebrate the moment.',
    title: 'Coffee',
  },
  {
    img: `${loginPic3}`,
    msg: 'Food is our common ground, a universal experience.',
    title: 'Pizza',
  },
];

const Login = () => {
  const [form, setForm] = React.useState('Login');
  useTitle(`RedPanda - ${form} `);

  const handleChange = (event, newForm) => {
    if (newForm !== null) {
      setForm(newForm);
    }
  };
  return (
    <Container maxWidth="md" sx={{ py: '24px' }}>
      <Grid container border={1} borderColor="white" borderRadius="25px">
        <Grid
          item
          p={4}
          sm={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderTopLeftRadius: '25px',
            borderBottomLeftRadius: '25px',
          }}
        >
          <ToggleButtonGroup
            value={form}
            exclusive
            onChange={handleChange}
            sx={{ display: 'flex', width: '100%' }}
            size="large"
            fullWidth
          >
            <ToggleButton
              value="Login"
              sx={{
                borderRadius: '50px',

                border: 2,
                borderColor: 'white',
                p: 1,

                '&.MuiToggleButton-root.Mui-selected': {
                  backgroundColor: 'secondary.main',
                  '.MuiTypography-root': {
                    color: 'black',
                  },
                },
              }}
            >
              <Typography variant="subtitle2" color="white">
                Login
              </Typography>
            </ToggleButton>
            <ToggleButton
              value="SignUp"
              sx={{
                borderRadius: '50px',
                border: 2,
                borderColor: 'white',
                p: 1,

                '&.MuiToggleButton-root.Mui-selected': {
                  backgroundColor: 'secondary.main',
                  '.MuiTypography-root': {
                    color: 'black',
                  },
                },
              }}
            >
              <Typography variant="subtitle2" color="white">
                Sign Up
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>

          {form === 'Login' ? <LoginForm /> : <SignupForm setForm={setForm} />}
        </Grid>
        <Grid
          item
          sm
          sx={{
            display: { xs: 'none', sm: 'block' },
            borderLeft: '1px solid white',
            height: 'auto',
            width: '100%',
            borderTopRightRadius: '25px',
            borderBottomRightRadius: '25px',
          }}
        >
          <Carousel
            navButtonsAlwaysInvisible
            stopAutoPlayOnHover={false}
            indicators={false}
            interval={10000}
            animation="slide"
            swipe={false}
          >
            {sidebar.map((item) => (
              <Box
                key={item.title}
                component="img"
                src={item.img}
                alt={item.title}
                width="100%"
                height="auto"
                display="flex"
                sx={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderTopRightRadius: '25px',
                  borderBottomRightRadius: '25px',
                }}
              />
            ))}
          </Carousel>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
