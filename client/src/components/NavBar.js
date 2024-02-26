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
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import CollectionsIcon from '@mui/icons-material/Collections';
import StorefrontIcon from '@mui/icons-material/Storefront';
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

  const routeMatch = useRouteMatch([
    '/',
    '/menu/*',
    '/gallery',
    '/about',
    '/profile',
    '/reservation',
  ]);

  const currentTab = routeMatch === null ? false : routeMatch?.pattern?.path;
  console.log('currentTab', currentTab);

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

  // for mobile
  const drawerWidth = 200;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMobileLogout = () => {
    handleDrawerClose();

    sendLogout();
    notify(`Logged Out Successfully`);
  };

  const [selectedIndex, setSelectedIndex] = useState('/');

  console.log('selected', selectedIndex);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleDrawerClose();
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar
          variant="dense"
          disableGutters
          sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column' }}
        >
          {/* Top Navigation */}
          <Grid
            container
            direction="row"
            alignItems="center"
            display={{ xs: 'none', sm: 'flex' }}
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
                  <IconButton
                    sx={{ ml: 1, color: 'text.main' }}
                    onClick={colorMode.toggleColorMode}
                  >
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
              bgcolor: 'primary.light',
            }}
          >
            <Grid
              item
              sm={3}
              justifyContent="flex-start"
              pt={1}
              sx={{ objectFit: 'contain', objectPosition: 'center' }}
            >
              <img src={Logo} alt="Logo" width="40%" height="auto" />
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
        <Toolbar variant="dense" disableGutters sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <Grid
            container
            borderBottom={1}
            px={1}
            sx={{
              borderColor: 'white',
              bgcolor: 'primary.light',
            }}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item xs={2} alignItems="center" justifyContent="center">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid
              item
              container
              xs={7}
              justifyContent="center"
              pt={1}
              sx={{ objectFit: 'contain', objectPosition: 'center' }}
            >
              <img src={Logo} alt="Logo" width="50%" height="auto" />
            </Grid>
            <Grid item xs={2} alignSelf="center" justifyContent="center" display="flex">
              <IconButton
                sx={{
                  color: 'white',

                  '&.MuiIconButton-root:hover': {
                    color: 'secondary.main',
                  },
                }}
                size="small"
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
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            color: 'white',
            backgroundColor: 'rgba(9, 14, 16, 0.6)',
          },
        }}
      >
        <Box
          display="flex"
          sx={{ backgroundColor: 'primary.light', flexGrow: 1, padding: 2 }}
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Tooltip title={<>{theme.palette.mode} mode</>} arrow>
                <IconButton sx={{ ml: 1, color: 'text.main' }} onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === 'dark' ? (
                    <DarkModeIcon fontSize="small" />
                  ) : (
                    <LightModeIcon fontSize="small" sx={{ color: 'orange' }} />
                  )}
                </IconButton>
              </Tooltip>
              <Box display="flex">
                {token === null ? (
                  <Button
                    variant="text"
                    component={Link}
                    to="/login"
                    onClick={handleDrawerClose}
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
                      <Typography p={1} fontSize={12}>
                        Welcome , {customer?.firstName}
                      </Typography>
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
            </Box>
            <List component="nav" aria-label="main mailbox folders">
              {token !== null && (
                <ListItemButton
                  selected={selectedIndex === '/profile'}
                  onClick={(event) => handleListItemClick(event, '/profile')}
                  component={Link}
                  to="/profile"
                  sx={{
                    '&.MuiListItemButton-root:hover': {
                      bgcolor: 'secondary.light',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'neutral.main',
                    },
                    my: 1,
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon
                      sx={{
                        color: 'white',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
              )}
              <ListItemButton
                selected={selectedIndex === '/'}
                onClick={(event) => handleListItemClick(event, '/')}
                component={Link}
                to="/"
                sx={{
                  '&.MuiListItemButton-root:hover': {
                    bgcolor: 'secondary.light',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'neutral.main',
                  },
                  my: 1,
                }}
              >
                <ListItemIcon>
                  <HomeIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === '/menu'}
                onClick={(event) => handleListItemClick(event, '/menu')}
                component={Link}
                to="/menu"
                sx={{
                  '&.MuiListItemButton-root:hover': {
                    bgcolor: 'secondary.light',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'neutral.main',
                  },
                  my: 1,
                }}
              >
                <ListItemIcon>
                  <MenuBookIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Menu" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === '/gallery'}
                onClick={(event) => handleListItemClick(event, '/gallery')}
                component={Link}
                to="/gallery"
                sx={{
                  '&.MuiListItemButton-root:hover': {
                    bgcolor: 'secondary.light',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'neutral.main',
                  },
                  my: 1,
                }}
              >
                <ListItemIcon>
                  <CollectionsIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Gallery" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === '/about'}
                onClick={(event) => handleListItemClick(event, '/about')}
                component={Link}
                to="/about"
                sx={{
                  '&.MuiListItemButton-root:hover': {
                    bgcolor: 'secondary.light',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'neutral.main',
                  },
                  my: 1,
                }}
              >
                <ListItemIcon>
                  <StorefrontIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="About Us" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === '/reservation'}
                onClick={(event) => handleListItemClick(event, '/reservation')}
                component={Link}
                to="/reservation"
                sx={{
                  '&.MuiListItemButton-root:hover': {
                    bgcolor: 'secondary.light',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'neutral.main',
                  },
                  my: 1,
                }}
              >
                <ListItemIcon>
                  <CalendarMonthTwoToneIcon
                    sx={{
                      color: 'white',
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary="Reservation" />
              </ListItemButton>
            </List>
          </Box>
          {token !== null && (
            <Box display="flex" flexDirection="column" gap={2}>
              <Divider light sx={{ borderColor: 'white' }} />
              <Button
                variant="text"
                onClick={handleMobileLogout}
                sx={{
                  color: 'white',
                  '&.MuiButton-root:hover': {
                    bgcolor: 'secondary.main',
                  },
                }}
                endIcon={<Logout />}
              >
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar;
