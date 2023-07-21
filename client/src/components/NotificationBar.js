/* eslint-disable react/jsx-props-no-spreading */
import { Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../features/notification/notificationSlice';

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const NotificationBar = () => {
  const dispatch = useDispatch();
  const snackbarOpen = useSelector((state) => state.notification.notificationOpen);
  const snackbarType = useSelector((state) => state.notification.notificationType);
  const snackbarMessage = useSelector((state) => state.notification.notificationMessage);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setNotification(false, snackbarType, snackbarMessage));
  };
  return (
    <Box>
      <Snackbar open={snackbarOpen} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarType} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NotificationBar;
