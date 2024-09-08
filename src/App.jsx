import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slices/user';
import router from './route/Router';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('user') != null && localStorage.getItem('userToken') != null) {
      const user = JSON.parse(localStorage.getItem('user'));
      const userToken = JSON.parse(localStorage.getItem('userToken'));
      dispatch(setUser({ user: user, userToken: userToken }));
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
