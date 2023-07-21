import { Stack, TextField, Typography, Paper, InputAdornment, Button } from '@mui/material';
import React, { useEffect } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation, useSendLogoutMutation } from '../../features/auth/authApiSlice';
import { setNotification } from '../../features/notification/notificationSlice';
import useField from '../../hooks/useField';
import { useUpdatePasswordMutation } from '../../features/customer/customerApiSlice';
import ProfileSubHeader from '../../components/ProfileSubHeader';

const ChangePassword = ({ value, index, customerAuth }) => {
  const [login] = useLoginMutation('passwordCheck', { skip: !customerAuth });
  const [sendLogout] = useSendLogoutMutation();
  const [updatePassword, { isSuccess }] = useUpdatePasswordMutation('updatePassword');
  const currentPassword = useField('password');
  const newPassword = useField('password');
  const confirmPassword = useField('text');

  const navigate = useNavigate();
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
  // eslint-disable-next-line consistent-return
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await login({
        email: customerAuth?.email,
        password: currentPassword.fields.value,
      }).unwrap();
      if (newPassword.fields.value !== confirmPassword.fields.value) {
        return notify('Pasword not Matching', 'error');
      }
      if (result && newPassword.fields.value === confirmPassword.fields.value) {
        await updatePassword({
          id: customerAuth.id,
          updatePassword: {
            currentPassword: currentPassword.fields.value,
            newPassword: confirmPassword.fields.value,
          },
        });
      }
    } catch (err) {
      notify(`${err.data?.message}`, 'error');
    }
  };

  const handleReset = () => {
    currentPassword.reset();
    newPassword.reset();
    confirmPassword.reset();
  };

  useEffect(() => {
    if (isSuccess) {
      handleReset();
      sendLogout();
      navigate('/');
      notify('Password Changed Successfully');
    }
  }, [isSuccess]);

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`}>
      {value === index && (
        <ProfileSubHeader title="Change Password">
          <form onSubmit={handleSubmit}>
            <Stack component={Paper} elevation={3} p={3} alignItems="center">
              <Stack direction="column" spacing={2} alignItems="flex-start">
                <Typography variant="subtitle2">Current Password:</Typography>
                <TextField
                  type={currentPassword.fields.type}
                  value={currentPassword.fields.value}
                  onChange={currentPassword.fields.onChange}
                  placeholder="Password"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack direction="column" spacing={2} alignItems="flex-start" my={2}>
                <Typography variant="subtitle2">New Password:</Typography>
                <TextField
                  placeholder="New Password"
                  type={newPassword.fields.type}
                  value={newPassword.fields.value}
                  onChange={newPassword.fields.onChange}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack direction="column" spacing={2} alignItems="flex-start" my={2}>
                <Typography variant="subtitle2">Confirm Password:</Typography>
                <TextField
                  placeholder=" Confirm Password"
                  size="small"
                  type={confirmPassword.fields.type}
                  value={confirmPassword.fields.value}
                  onChange={confirmPassword.fields.onChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack direction="row" spacing={4} mt={2}>
                <Button type="submit" variant="contained" color="secondary">
                  Confirm
                </Button>
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </ProfileSubHeader>
      )}
    </div>
  );
};

export default ChangePassword;
