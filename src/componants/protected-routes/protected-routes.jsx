import { Navigate } from 'react-router-dom';
import Unauthorized from '../../Pages/Others/unauthorized/Unauthorized';

const ProtectedRoutes = ({ children, allowedRoles }) => {
  if (localStorage.getItem('user') == null) {
    return <Navigate to={'/login'} />;
  }
  const user = JSON.parse(localStorage.getItem('user'));
  
  return allowedRoles.includes(user.role.toString()) ? children : <Unauthorized />;
};

export default ProtectedRoutes;
