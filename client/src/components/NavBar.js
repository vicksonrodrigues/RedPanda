/* eslint-disable react/jsx-props-no-spreading */
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
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  AppBar,
  Toolbar,
  styled,
} from '@mui/material';
import { Link, matchPath, useLocation } from 'react-router-dom';
// Icon Import
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CallIcon from '@mui/icons-material/Call';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';

// logo
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assests/Logo/Red-Panda-Logo-Transparent.png';

// component imports
import SocialButtons from './Social';
import { useThemeUpdate } from './ThemeToggle';
import useAuth from '../hooks/useAuth';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { selectCurrentToken } from '../features/auth/authSlice';
import { useGetCustomerQuery } from '../features/customer/customerApiSlice';
import { setNotification } from '../features/notification/notificationSlice';

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

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  if (string) {
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

// eslint-disable-next-line consistent-return
function stringAvatar(firstName) {
  if (firstName) {
    return {
      sx: {
        border: '1px solid white',
        color: 'white',
        bgcolor: stringToColor(firstName),
      },
      children: `${firstName?.split(' ')[0][0]}`,
    };
  }
}

const NavBar = () => {
  const token = useSelector(selectCurrentToken);
  const cartCount = useSelector((state) => state.cart.length);

  // const customer = useSelector((state) => state.customer);
  // eslint-disable-next-line no-unused-vars
  const user = useAuth();

  const { data: customer } = useGetCustomerQuery(user?.id, {
    pollingInterval: 60000,
    skip: !user,
  });

  const [sendLogout] = useSendLogoutMutation();
  const dispatch = useDispatch();
  const notify = (notificationMessage, notificationType, notificationOpen = true) => {
    dispatch(
      setNotification({
        notificationOpen,
        notificationType,
        notificationMessage,
      }),
    );
  };

  // local states
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const routeMatch = useRouteMatch(['/', '/menu/*', '/gallery', '/about']);

  const currentTab = routeMatch === null ? false : routeMatch?.pattern?.path;

  const colorMode = useThemeUpdate();

  const theme = useTheme();

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();

    sendLogout();
    notify(`Logged Out Successfully`);
  };
  const location = useLocation();

  const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
    textTransform: 'none',
    color: 'white',
    fontSize: theme.typography.pxToRem(18),
  }));

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense" disableGutters sx={{ display: 'flex', flexDirection: 'column' }}>
        {/* Top Navigation */}
        <Grid
          container
          direction="row"
          alignItems="center"
          px={2}
          py={1}
          sx={{
            bgcolor: 'neutral.main',
            borderTop: 1,
            borderBottom: 1,
            borderColor: 'white',
          }}
        >
          <Grid item sm={4} px={2} sx={{ alignItems: 'center', display: 'inline-flex' }}>
            <Typography variant="overline">Follow Us :</Typography>
            <SocialButtons color="white" />
          </Grid>

          <Grid item sm={8} display="inline-flex" alignItems="center" justifyContent="flex-end">
            <Box display="flex" alignItems="center">
              <Typography variant="overline">RESERVATIONS:</Typography>

              <Box display="inline-flex" alignItems="center" mx={1}>
                <CallIcon fontSize="small" />
                <Typography variant="overline" pl={1}>
                  1-222-333-444
                </Typography>
              </Box>
              <Typography variant="overline" mx={1}>
                OR
              </Typography>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                startIcon={<CalendarMonthTwoToneIcon />}
                component={Link}
                to="/reservation"
                sx={{ mx: 1 }}
              >
                Book Online
              </Button>
            </Box>
            <Box>
              <Tooltip title={<>{theme.palette.mode} mode</>} arrow>
                <IconButton sx={{ ml: 1, color: 'text.main' }} onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === 'dark' ? (
                    <DarkModeIcon fontSize="small" />
                  ) : (
                    <LightModeIcon fontSize="small" sx={{ color: 'orange' }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
        {/* Main Navigation */}
        <Grid
          container
          direction="row"
          borderBottom={1}
          px={2}
          sx={{
            borderColor: 'white',
            bgcolor: 'primary.main',
          }}
        >
          <Grid
            item
            sm={3}
            justifyContent="flex-start"
            pt={2}
            sx={{ objectFit: 'contain', objectPosition: 'center' }}
          >
            <img src={Logo} alt="Logo" width="50%" height="auto" />
          </Grid>
          <Grid item sm={6} alignSelf="flex-end" justifyContent="center" width={1}>
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
              <StyledTab value="/" label="Home" component={Link} to="/" />
              <StyledTab value="/menu/*" label="Menu" component={Link} to="/menu" />
              <StyledTab value="/gallery" label="Gallery" component={Link} to="/gallery" />
              <StyledTab value="/about" label="About Us" component={Link} to="/about" />
            </Tabs>
          </Grid>
          <Grid
            item
            sm={3}
            alignSelf="flex-end"
            justifyContent="center"
            display="flex"
            pb="4px"
            pl={3}
          >
            <IconButton
              sx={{
                color: 'white',

                '&.MuiIconButton-root:hover': {
                  color: 'secondary.main',
                },
              }}
              component={Link}
              to="/cart"
            >
              <Badge
                badgeContent={cartCount}
                sx={{
                  '.MuiBadge-badge': {
                    bgcolor: 'neutral.main',
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Box display="flex" pl={2}>
              {token === null ? (
                <Button
                  variant="text"
                  component={Link}
                  to="/login"
                  state={location}
                  sx={{
                    color: 'white',
                    '&.MuiButton-root:hover': {
                      bgcolor: 'secondary.main',
                    },
                  }}
                >
                  Login
                </Button>
              ) : (
                <div>
                  <Box>
                    <Tooltip title="Account settings">
                      <IconButton
                        size="small"
                        onClick={handleProfileMenu}
                        sx={{
                          '&.MuiIconButton-root:hover': {
                            bgcolor: 'secondary.light',
                          },
                        }}
                      >
                        <Avatar {...stringAvatar(customer?.firstName)} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        width: '200px',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },

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
                  >
                    <Typography p={2}>Welcome , {customer?.firstName}</Typography>

                    <MenuItem component={Link} to="/profile" onClick={handleClose}>
                      <Avatar sizes="small" />
                      Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
