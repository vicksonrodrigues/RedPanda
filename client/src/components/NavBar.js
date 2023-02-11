import { React, useState } from 'react';

// import { useSelector, useDispatch } from 'react-redux';

import {
  Box,
  IconButton,
  Button,
  Typography,
  Badge,
  Tabs,
  Tab,
  useTheme,
  Tooltip,
  Grid,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import { Link, matchPath, useLocation } from 'react-router-dom';
// Icon Import
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CallIcon from '@mui/icons-material/Call';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// logo
import { useSelector } from 'react-redux';
import Logo from '../assests/Logo/Red-Panda-Logo-Transparent.png';

// component imports
import SocialButtons from './Social';
import { useThemeUpdate } from './ThemeToggle';
import useAuth from '../hooks/useAuth';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { selectCurrentToken } from '../features/auth/authSlice';
import { useGetCustomerQuery } from '../features/customer/customerApiSlice';

function useRouteMatch(patterns) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

const NavBar = () => {
  const token = useSelector(selectCurrentToken);
  // const customer = useSelector((state) => state.customer);
  // eslint-disable-next-line no-unused-vars
  const { id } = useAuth();
  console.log(id);

  const { data: customer } = useGetCustomerQuery(id);
  console.log('Current Customer', customer);

  const [sendLogout] = useSendLogoutMutation();

  // local states
  const [profileMenu, setProfileMenu] = useState(null);

  const routeMatch = useRouteMatch(['/', '/menu/*', '/gallery', '/about']);

  const currentTab = routeMatch === null ? false : routeMatch?.pattern?.path;

  const colorMode = useThemeUpdate();

  const theme = useTheme();

  const handleProfileMenu = (event) => {
    setProfileMenu(event.currentTarget);
  };

  const handleClose = () => {
    setProfileMenu(null);
  };

  return (
    <Box>
      {/* Top Navigation */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1}
        height={50}
        wrap="nowrap"
        sx={{
          bgcolor: 'neutral.main',
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'white',
        }}
      >
        <Grid item xs={4} display="flex" sx={{ alignItems: 'center' }}>
          <Typography variant="subtitle2">Follow Us :</Typography>
          <SocialButtons />
        </Grid>

        <Grid item xs={8} display="flex" alignItems="center" justifyContent="flex-end">
          <Typography variant="subtitle2">RESERVATIONS:</Typography>

          <Box display="flex" alignItems="center" mx={1}>
            <CallIcon fontSize="small" />
            <Typography variant="subtitle2">1-222-333-444</Typography>
          </Box>
          <Typography variant="subtitle2" mx={1}>
            OR
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<CalendarMonthTwoToneIcon />}
            component={Link}
            to="/reservation"
            sx={{ mx: 1 }}
          >
            <Typography variant="subtitle2">Book Online</Typography>
          </Button>
          <Tooltip title={<>{theme.palette.mode} mode</>} arrow>
            <IconButton sx={{ ml: 1, color: 'text.main' }} onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <LightModeIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        borderBottom={1}
        px={2}
        sx={{
          borderColor: 'white',
          bgcolor: 'primary.main',
          height: 120,
        }}
      >
        <Grid item xs={3}>
          <Box
            display="flex"
            justifyContent="flex-start"
            sx={{
              backgroundImage: `url(${Logo})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              height: 120,
              width: 200,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" height="100%" alignItems="flex-end" justifyContent="center">
            <Tabs
              value={currentTab}
              textColor="secondary"
              centered
              sx={{
                '& .MuiTabs-indicator': {
                  backgroundColor: 'secondary.light',
                  height: '4px',
                },
              }}
            >
              <Tab value="/" label="Home" sx={{ color: 'white' }} component={Link} to="/" />
              <Tab
                value="/menu/*"
                label="Menu"
                sx={{ color: 'white' }}
                component={Link}
                to="/menu"
              />
              <Tab
                value="/gallery"
                label="Gallery"
                sx={{ color: 'white' }}
                component={Link}
                to="/gallery"
              />
              <Tab
                value="/about"
                label="About Us"
                sx={{ color: 'white' }}
                component={Link}
                to="/about"
              />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Stack
            direction="row"
            display="flex"
            height="100%"
            alignItems="flex-end"
            justifyContent="flex-end"
            py={1}
            mr={3}
            spacing={2}
          >
            <IconButton sx={{ color: 'white' }} component={Link} to="/cart">
              <Badge badgeContent={1} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Box>
              {token === null ? (
                <Button
                  variant="contained"
                  component={Link}
                  to="/login"
                  disableElevation
                  sx={{
                    '&.MuiButton-root:hover': {
                      bgcolor: 'secondary.main',
                    },
                  }}
                >
                  <Typography variant="subtitle2">Login/Sign-Up</Typography>
                </Button>
              ) : (
                <div>
                  <IconButton
                    size="small"
                    onClick={handleProfileMenu}
                    sx={{
                      '&.MuiIconButton-root:hover': {
                        bgcolor: 'secondary.light',
                      },
                    }}
                  >
                    <Avatar>
                      <AccountCircleIcon sx={{ color: 'black' }} />
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={profileMenu}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        width: '200px',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0.5,

                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 20,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    open={Boolean(profileMenu)}
                    onClose={handleClose}
                  >
                    <Typography px={2} py={1}>
                      Welcome , {customer.firstName}
                    </Typography>
                    <Divider />
                    <MenuItem component={Link} to="/profile" onClick={handleClose}>
                      <Avatar sizes="small" />
                      Profile
                      <ArrowForwardIosIcon />
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={sendLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NavBar;
