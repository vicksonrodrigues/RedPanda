import React, { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Footer from './Footer';
import Home from './Home';
import Page from './Page';
import About from './AboutUs';
import Menu from './Menu';
import Reservation from './Reservation';
import NavBar from './NavBar';

import { ThemeToggle } from './Theme/ThemeToggle';
import Login from './Login';
import Gallery from './Gallery';
import Cart from './Cart';
import Profile from './Profile';
import Checkout from './Checkout';

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => (
  <ThemeToggle>
    <Box>
      <Wrapper />
      <NavBar />
      <Routes>
        <Route
          index
          path="/"
          element={
            <Page title="RedPanda">
              <Home />
            </Page>
          }
        />

        <Route
          path="/about"
          element={
            <Page title="RedPanda - About Us">
              <About />
            </Page>
          }
        />

        <Route
          path="/gallery"
          element={
            <Page title="RedPanda - Gallery">
              <Gallery />
            </Page>
          }
        />

        <Route path="/menu">
          <Route
            index
            element={
              <Page title="RedPanda - Menu">
                <Menu />
              </Page>
            }
          />
          <Route path=":id" element={<Menu />} />
        </Route>

        <Route
          path="/login"
          element={
            <Page title="RedPanda - Login">
              <Login />
            </Page>
          }
        />

        <Route
          path="/sign-up"
          element={
            <Page title="RedPanda - Sign-Up">
              <Menu />
            </Page>
          }
        />
        <Route
          path="/reservation"
          element={
            <Page title="Redpanda - Reservation">
              <Reservation />
            </Page>
          }
        />
        <Route
          path="/cart"
          element={
            <Page title="RedPanda - Cart">
              <Cart />
            </Page>
          }
        />
        <Route
          path="/profile"
          element={
            <Page title="RedPanda - Profile">
              <Profile />
            </Page>
          }
        />
        <Route
          path="/checkout"
          element={
            <Page title="RedPanda - Checkout">
              <Checkout />
            </Page>
          }
        />
      </Routes>
      <Footer />
    </Box>
  </ThemeToggle>
);

export default App;
