import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children ,allowedRoles}) => {

  if (localStorage.getItem('user') == null) {
    return <Navigate to={'/login'} />
  } 
const user =JSON.parse(localStorage.getItem('user'));

  return allowedRoles.includes(user.role)?children:<h1>UnAuthorized</h1>;
};

export default ProtectedRoutes;
