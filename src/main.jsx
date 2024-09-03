import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { ConfigProvider } from 'antd';
import store from './redux/store.js';
import App from './App.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ConfigProvider direction='ltr'>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </ChakraProvider>
);
