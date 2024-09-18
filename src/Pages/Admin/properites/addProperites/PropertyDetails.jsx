import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Stack } from '@chakra-ui/react';
import { getCompounds } from '../../../../redux/thunck/crudCompounds';
import { Input, InputNumber, Select } from 'antd';

const PropertyDetails = ({ formData, handleChange }) => {
  const { compounds } = useSelector((state) => state.compounds);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompounds());
  }, []);
  return (
    <Box px={5}>
      <h3 className=' text-xl fw-semibold text-[#4D5454] mb-3'>1.Property Details</h3>
      <Stack w='80%'>
        <Flex gap={5}>
          <Select
            placeholder='Choose Compound'
            size='large'
            value={formData.name_en}
            onChange={handleChange}
          >
            {compounds?.map((compound) => (
              <option
                value={compound.id}
                key={compound.id}
              >
                {compound.name}
              </option>
            ))}
          </Select>
          <Input
            placeholder='Properity Name...'
            size='large'
          />
        </Flex>
        <Flex
          mt={2}
          gap={3}
        >
          <Select
            placeholder='Zone'
            size='large'
            style={{ width: '230px' }}
          >
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
          <InputNumber
            placeholder='Floor Number'
            size='large'
            min={1}
            style={{ width: '200px' }}
          />

          <Select
            style={{ width: '200px' }}
            placeholder='Model'
            size='large'
          >
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>

          <InputNumber
            placeholder='Floor Number'
            size='large'
            min={1}
            style={{ width: '200px' }}
          />
          <InputNumber
            placeholder='Size Area'
            size='large'
            min={1}
            style={{ width: '200px' }}
          />
        </Flex>
      </Stack>
    </Box>
  );
};

export default PropertyDetails;
