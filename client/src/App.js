import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

// component imports
import { useSelector } from 'react-redux';
import { ThemeToggle } from './components/ThemeToggle';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import NotificationBar from './components/NotificationBar';

// page imports
import Home from './pages/Home';
import About from './pages/AboutUs';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import { selectCurrentToken } from './features/auth/authSlice';
import { useRefreshMutation } from './features/auth/authApiSlice';
// import { useGetCustomerQuery } from './features/customer/customerApiSlice';

// return page to the top on change or refresh
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const App = () => {
  const token = useSelector(selectCurrentToken);

  const [refresh] = useRefreshMutation();

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
      const verifyRefreshToken = async () => {
        console.log('verifying refresh token');
        try {
          await refresh();
        } catch (err) {
          console.error(err);
        }
      };
      if (!token) {
        verifyRefreshToken();
      }
    }
    // eslint-disable-next-line no-return-assign
    return () => (effectRan.current = true);
  }, []);

  return (
    <ThemeToggle>
      <Box>
        <Wrapper />
        <NotificationBar />
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route index path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route path="/gallery" element={<Gallery />} />

          <Route path="/menu">
            <Route index element={<Menu />} />
            <Route path=":id" element={<Menu />} />
          </Route>

          <Route path="/reservation" element={<Reservation />} />

          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Box>
    </ThemeToggle>
  );
};

export default App;
