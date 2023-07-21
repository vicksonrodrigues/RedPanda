import React, { useEffect, useRef } from 'react';
// component imports
import { useSelector } from 'react-redux';
import { ThemeToggle } from './components/ThemeToggle';

// page imports
import { selectCurrentToken } from './features/auth/authSlice';
import { useRefreshMutation } from './features/auth/authApiSlice';
import SiteRouter from './components/SiteRouter';

const App = () => {
  const token = useSelector(selectCurrentToken);

  const [refresh] = useRefreshMutation();

  const effectRan = useRef(false);
  useEffect(() => {
    if (effectRan.current === true) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch (err) {
          console.error('Error in App ', err);
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
      <SiteRouter />
    </ThemeToggle>
  );
};

export default App;
