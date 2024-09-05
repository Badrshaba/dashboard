import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
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

createRoot(document.getElementById('root')).render(
  <ErrorBoundry>
    <ChakraProvider>
      <ConfigProvider theme={{
    '@primary-color': '#fffff',
    '@table-header-bg': '#1d1d1d',
    '@table-bg': '#141414',
    '@text-color': '#fff',
  }} direction='ltr'>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Provider>
      </ConfigProvider>
    </ChakraProvider>
  </ErrorBoundry>
);
