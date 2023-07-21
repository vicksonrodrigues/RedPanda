import React from 'react';
import { Outlet, RouterProvider, ScrollRestoration, createBrowserRouter } from 'react-router-dom';
import { Box } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import Footer from './Footer';
import NoMatch from '../pages/NoMatch';
import Home from '../pages/Home';
import NotificationBar from './NotificationBar';
import AboutUs from '../pages/AboutUs';
import Gallery from '../pages/Gallery';
import MenuPage from '../pages/Menu';
import Reservation from '../pages/Reservation';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Profile from '../pages/Profile';
import Checkout from '../pages/Checkout';
import background from '../assests/WelcomeBackground.jpg';
import ConfirmedOrder from '../pages/ConfirmedOrder';
import ProtectedRoute from './ProtectedRoute';
import useAuth from '../hooks/useAuth';

const Layout = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...(theme.palette.mode === 'light' && {
          backgroundImage: `url(${background})`,
        }),
      }}
    >
      <ScrollRestoration />
      <NotificationBar />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Box>
  );
};

const SiteRouter = () => {
  const cartList = useSelector((state) => state.cart);
  const customer = useAuth();

  const BrowserRoutes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NoMatch />,
      children: [
        {
          errorElement: <NoMatch />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: '/about',
              element: <AboutUs />,
            },
            {
              path: '/gallery',
              element: <Gallery />,
            },
            {
              path: '/menu',
              element: <MenuPage />,
            },
            {
              path: '/reservation',
              element: <Reservation />,
            },
            {
              path: '/login',
              element: !customer ? <Login /> : <Profile />,
            },
            {
              path: '/cart',
              element: <Cart />,
            },
            // Protected Routes

            {
              path: '/profile',
              element: (
                <ProtectedRoute>
                  <Profile />,
                </ProtectedRoute>
              ),
            },
            {
              path: '/checkout',
              element:
                cartList.length > 0 ? (
                  <Checkout />
                ) : (
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                ),
            },
            {
              path: '/confirmed',
              element: (
                <ProtectedRoute>
                  <ConfirmedOrder />
                </ProtectedRoute>
              ),
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={BrowserRoutes} />;
};

export default SiteRouter;
