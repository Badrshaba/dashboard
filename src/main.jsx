import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { ConfigProvider } from 'antd';
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
