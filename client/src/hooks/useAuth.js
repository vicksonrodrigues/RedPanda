import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { selectCurrentToken } from '../features/auth/authSlice';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  if (token) {
    const decoded = jwtDecode(token);
    const { email, id } = decoded;

    return { email, id };
  }
  return null;
};

export default useAuth;
