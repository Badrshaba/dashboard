import { Box, Flex } from '@chakra-ui/react';
import { Input, Select } from 'antd';

const Nearby = () => {
  return (
    <Box px={5}>
      <h3 className='mb-3 text-xl fw-semibold text-[#4D5454]'>5.Nearby Services</h3>
      <Flex
        gap={3}
        wrap='wrap'
      >
        <Select
          size='large'
          placeholder='Parks & Gardens'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='Schools'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='Clubhouse'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='commercial_strip'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='business_hub'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='mosque'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='sports_clubs'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='bicycles_lanes'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='medical_center'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='disability_support'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='gym'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='swimming_pool'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='grage'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='basketball'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='tennis'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='laundry'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='wellness_facilities'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='transportation'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='water_features'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='cafes'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
        <Select
          size='large'
          placeholder='restaurant'
        >
          <option value='1'>Yes</option>
          <option value='0'>No</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default Nearby;
