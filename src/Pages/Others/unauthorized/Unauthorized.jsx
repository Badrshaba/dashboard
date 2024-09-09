import { Box } from '@chakra-ui/react';
import { Result } from 'antd';

const Unauthorized = () => {
  return (
    <Box
      justifyContent='center'
      alignItems='center'
      flex='row'
    >
      <Result
        status='403'
        title='403'
        subTitle='Sorry, you are not authorized to access this page.'
      />
    </Box>
  );
};

export default Unauthorized;
