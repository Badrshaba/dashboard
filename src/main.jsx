import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { background, ChakraProvider } from '@chakra-ui/react';
import { ConfigProvider } from 'antd';
import store from './redux/store.js';
import App from './App.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';
import { ErrorBoundry } from './componants/index.js';

const queryClient = new QueryClient({
  defaultOptions: {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  },
});
// blackcolorText=4D5454
// greenColor=44BE2B
// borderColor=E3D9D9
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
    },
  },
};
createRoot(document.getElementById('root')).render(
  <ErrorBoundry>
    <ChakraProvider>
      <ConfigProvider
        direction='ltr'
        theme={theme}
        com
      >
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Provider>
      </ConfigProvider>
    </ChakraProvider>
  </ErrorBoundry>
);
