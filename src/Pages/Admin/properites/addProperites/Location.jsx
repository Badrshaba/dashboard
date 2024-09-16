import { Box, Flex } from '@chakra-ui/react';
import { Input } from 'antd';

const Location = () => {
  return (
    <Box px={5}>
      <h3 className='mb-3 text-xl fw-semibold text-[#4D5454]'>3.Location</h3>
      <Flex gap={5}>
        <Input
          style={{ width: '250px' }}
          placeholder='Address...'
          size='large'
        />
        <Input
          style={{ width: '250px' }}
          size='large'
          placeholder='Nearby Landmark...'
        />
      </Flex>
    </Box>
  );
};

export default Location;
