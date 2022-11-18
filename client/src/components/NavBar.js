import { React } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
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
} from '@mui/material';

// Icon Import
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { Link, matchPath, useLocation } from 'react-router-dom';
import Logo from '../assests/Logo/Red-Panda-Logo-Transparent.png';
import { useThemeUpdate } from './Theme/ThemeToggle';

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
  const loginToggle = false;

  const routeMatch = useRouteMatch(['/', '/menu/*', '/gallery', '/about']);

  const currentTab = routeMatch === null ? false : routeMatch?.pattern?.path;

  const colorMode = useThemeUpdate();

  const theme = useTheme();

  return (
    <AppBar position="static">
      {/* Top Navigation */}
      <Toolbar
        variant="dense"
        sx={{
          bgcolor: 'primary.light',
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: 1,
          borderBottom: 1,
        }}
      >
        <Box
          className="socials"
          sx={{ display: 'inline-flex', alignItems: 'center', color: 'text.primary' }}
        >
          <Typography variant="subtitle2" color="text.primary">
            Follow Us :
          </Typography>
          <IconButton>
            <FacebookIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <InstagramIcon fontSize="small" />
          </IconButton>
          <IconButton>
            <TwitterIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <Typography color="text.primary" variant="subtitle2">
            RESERVATIONS 1-222-333-444
          </Typography>
          <Button
            variant="content"
            sx={{ ml: 2, color: 'secondary.light' }}
            component={Link}
            to="/reservation"
          >
            <CalendarMonthTwoToneIcon fontSize="small" />
            <Typography variant="subtitle2" px={1}>
              Book Now
            </Typography>
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
        </Box>
      </Toolbar>
      <Grid
        container
        direction="row"
        className="bottomNav"
        borderBottom={1}
        sx={{
          borderColor: 'white',
          bgcolor: 'primary.main',
          height: 110,
        }}
      >
        <Grid
          item
          className="logo"
          xs={2}
          style={{
            backgroundImage: `url(${Logo})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: 1,
          }}
        />
        <Grid item xs={8}>
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
        <Grid item xs={2}>
          <Stack
            direction="row"
            display="flex"
            height="100%"
            alignItems="flex-end"
            justifyContent="center"
            py={1}
            spacing={2}
          >
            <IconButton sx={{ color: 'white' }} component={Link} to="/cart">
              <Badge badgeContent={1} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Box>
              {!loginToggle ? (
                <Button variant="content" component={Link} to="/login">
                  <Typography color="white" variant="subtitle2">
                    Login
                  </Typography>
                </Button>
              ) : (
                <IconButton
                  size="small"
                  component={Link}
                  to="/profile"
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
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default NavBar;
