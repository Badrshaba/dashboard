import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { Box, Flex, Stack, Text, Textarea, Button } from '@chakra-ui/react';
import { Input, InputNumber, Select } from 'antd';
import { getProperityById } from '../../../redux/thunck/crudProperites';

const UpdatePage = () => {
  const { compounds } = useSelector((state) => state.compounds);
  const { properity } = useSelector((state) => state.properites);
  const { properiteId } = useParams();
const [formData,setFormData] = useState(null)
 // console.log(properity);
  const dispatch = useDispatch();
  const onSubmit =(e)=>{
    e.preventDefault();

  }

  console.log(formData);
  useEffect(()=>{
    dispatch(getProperityById(properiteId))
    setFormData(properity)
  },[])
  console.log(properity);
  return (
    <Box p={5}>
      <Text mb={5}>Update Properity With Id </Text>
      <form >
        <Stack space={20}>
          <Box>
            <Text>1.Property Details</Text>
            <Flex gap={5}>
              <Select
                placeholder='Choose Compound'
                size='large'
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
              value={formData?.name}
              />
            </Flex>
          </Box>
          <Box>
            <Text>2.Pricing and Financial Information</Text>
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
                 value={formData?.price_from}
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
                  value={formData?.price_to}
                 
                />
              </Flex>
            </Flex>
          </Box>
          <Box>
            <Text>3.Location</Text>
            <Flex gap={5}>
              <Input
                style={{ width: '250px' }}
                placeholder='Address...'
                size='large'
                value={formData?.address_en}
              />
              <Input
                style={{ width: '250px' ,direction:'rtl'}}
                size='large'
                placeholder='العنوان'
               value={formData?.address_ar}
              />
            </Flex>
          </Box>
          <Box>
            <Text>4. Amenities and Features </Text>
            <Flex
              gap={3}
              wrap='wrap'
            >
              <InputNumber
                size='large'
                placeholder='No. Of Rooms'
                style={{ width: '220px' }}
                value={formData?.rooms}
                />
              <InputNumber
                size='large'
                placeholder='No. Of Master Bed Rooms'
                style={{ width: '220px' }}
                value={formData?.master_bedroom}
                />
              <InputNumber
                size='large'
                placeholder='No. Of Bed Rooms'
                style={{ width: '220px' }}
                value={formData?.bedrooms}
                />
              <InputNumber
                size='large'
                placeholder='No. Of BathRooms'
                style={{ width: '220px' }}
                value={formData?.bathrooms}
                
                />
              <InputNumber
                size='large'
                placeholder='No. Of Balcony'
                style={{ width: '220px' }}
                value={formData?.balconies}
                />
              <InputNumber
                size='large'
                placeholder='No. Of kitchens'
                style={{ width: '220px' }}
                value={formData?.kitchens}
                />
              <Select
                style={{ width: '100px' }}
                placeholder='With WIFI...'
                size='large'
                value={formData?.wifi}
                
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
            </Flex>
          </Box>
          <Box>
            <Text>5.Nearby Services</Text>
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
          <Box>
            <Text>6.Media & Documents</Text>
            <Flex gap={5}></Flex>
          </Box>
          <Box>
            <Text>7.Description And Tags</Text>
            <Textarea
              resize='none'
              placeholder='Description'
              width={650}
              height={150}
              
            />
          </Box>
          <Box>
            <Text>8.Contact & Delivery</Text>
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
          <Button colorScheme='yellow'>Update</Button>
        </Stack>
      </form>
     
    </Box>
  );
};

export default UpdatePage;
