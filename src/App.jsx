import { RouterProvider } from 'react-router-dom';
import { createIcons, icons } from 'lucide';
import router from './utils/Router';
const App = () => {
  createIcons({ icons });
  return <RouterProvider router={router} />;
};

export default App;
