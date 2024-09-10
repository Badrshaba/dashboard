import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { ConfigProvider } from 'antd';
import store from './redux/store.js';
import App from './App.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

const theme = {
  token: {
    colorPrimary: 'teal',
  },
  components: {
    Table: {
      headerBg: 'rgba(250, 249, 246,1)',
      headerSplitColor: '#E3D9D9',
      rowHoverBg: 'rgba(250, 249, 246,1)',
    },
    Layout: {
      lightSiderBg: 'teal',
      headerBg: 'red',
      triggerBg: 'rgba(250, 249, 246,.2)',
      lightTriggerBg: 'rgba(250, 249, 246,.2)',
      lightTriggerColor: 'white',
    },
    Menu: {
      itemActiveBg: 'rgba(250, 249, 246,.2)',
      itemBg: 'teal',
      itemSelectedBg: 'rgba(250, 249, 246,.2)',
      itemColor: 'white',
      itemHoverBg: 'rgba(250, 249, 246,.2)',
      itemHoverColor: 'white',
      colorPrimary: 'white',
    },
  },
};
createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <ConfigProvider
      direction='ltr'
      theme={theme}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </ChakraProvider>
);
