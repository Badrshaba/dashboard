import { Box, Flex } from '@chakra-ui/react';
import { InputNumber, Select } from 'antd';
const AmenitiesAndFeatures = () => {
  return (
    <Box px={5}>
      <h3 className='mb-3 text-xl fw-semibold text-[#4D5454]'> 4. Amenities and Features </h3>
      <Flex
        gap={3}
        wrap='wrap'
      >
        <InputNumber
          size='large'
          placeholder='No. Of Rooms'
          style={{ width: '220px' }}
        />
        <InputNumber
          size='large'
          placeholder='No. Of Master Bed Rooms'
          style={{ width: '220px' }}
        />
        <InputNumber
          size='large'
          placeholder='No. Of Bed Rooms'
          style={{ width: '220px' }}
        />
        <InputNumber
          size='large'
          placeholder='No. Of BathRooms'
          style={{ width: '220px' }}
        />
        <InputNumber
          size='large'
          placeholder='No. Of Balcony'
          style={{ width: '220px' }}
        />
        <InputNumber
          size='large'
          placeholder='No. Of kitchens'
          style={{ width: '220px' }}
        />
        <Select
          placeholder='With WIFI...'
          size='large'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default AmenitiesAndFeatures;
