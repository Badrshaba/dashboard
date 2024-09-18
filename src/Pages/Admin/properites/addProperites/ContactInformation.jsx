import { Box, Flex } from '@chakra-ui/react';
import { Input } from 'antd';

const ContactInformation = () => {
  return (
    <Box px={5}>
      <h3 className='mb-3 text-xl fw-semibold text-[#4D5454]'>8.Contact & Delivery</h3>
      <Flex gap={3}>
        <Input
          type='phone'
          size='large'
          placeholder='Phone Number'
        />
        <Input
          type='text'
          size='large'
          placeholder='Delivery Date'
        />
      </Flex>
    </Box>
  );
};

export default ContactInformation;
