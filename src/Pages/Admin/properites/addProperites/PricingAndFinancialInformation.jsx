import { Box, Flex, Text } from '@chakra-ui/react';
import { InputNumber } from 'antd';

const PricingAndFinancialInformation = () => {
  return (
    <Box px={5}>
      <h3 className='mb-3 text-xl fw-semibold text-[#4D5454]'>
        2.Pricing and Financial Information
      </h3>
      <Flex
        gap={3}
        alignItems='center'
      >
        <Flex
          alignItems='center'
          gap={2}
        >
          <Text
            color='gray'
            fontWeight='bold'
          >
            From
          </Text>

          <InputNumber
            style={{ width: '180px' }}
            size='large'
            placeholder='Start Price...'
          />
        </Flex>
        <Flex
          alignItems='center'
          gap={2}
        >
          <Text
            color='gray'
            fontWeight='bold'
          >
            To
          </Text>

          <InputNumber
            style={{ width: '180px' }}
            size='large'
            placeholder='Maxmuim Price...'
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default PricingAndFinancialInformation;
