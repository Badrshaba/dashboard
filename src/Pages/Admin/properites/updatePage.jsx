import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Box, Flex, Stack, Text, Textarea, Button } from '@chakra-ui/react';
import { Input, InputNumber, Select } from 'antd';

const UpdatePage = () => {
  const { compounds } = useSelector((state) => state.compounds);
  const { properites } = useSelector((state) => state.properites);
  const { id } = useParams();
  const [properity] = properites.filter((pro) => pro.id == id);
  console.log(properity);
  const dispatch = useDispatch();
  const { register, control } = useForm();
  return (
    <Box p={5}>
      <Text mb={5}>Update Properity With Id {id}</Text>
      <form>
        <Stack space={20}>
          <Box>
            <Text>1.Property Details</Text>
            <Flex gap={5}>
              <Select
                placeholder='Choose Compound'
                size='large'
                {...register('compound')}
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
                {...register('properityName')}
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
                  {...register('priceFrom')}
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
                  {...register('priceAfter')}
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
                {...register('address')}
              />
              <Input
                style={{ width: '250px' }}
                size='large'
                placeholder='Nearby Landmark...'
                {...register('landMarks')}
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
                {...register('roomsNo')}
              />
              <InputNumber
                size='large'
                placeholder='No. Of Master Bed Rooms'
                style={{ width: '220px' }}
                {...register('noMasterBedRooms')}
              />
              <InputNumber
                size='large'
                placeholder='No. Of Bed Rooms'
                style={{ width: '220px' }}
                {...register('noBedRooms')}
              />
              <InputNumber
                size='large'
                placeholder='No. Of BathRooms'
                style={{ width: '220px' }}
                {...register('noBathRooms')}
              />
              <InputNumber
                size='large'
                placeholder='No. Of Balcony'
                style={{ width: '220px' }}
                {...register('noBalcony')}
              />
              <InputNumber
                size='large'
                placeholder='No. Of kitchens'
                style={{ width: '220px' }}
                {...register('noKitchens')}
              />
              <Select
                placeholder='With WIFI...'
                size='large'
                {...register('Wifi')}
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
                {...register('parksGardens')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='Schools'
                {...register('schools')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='Clubhouse'
                {...register('clubhouse')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='commercial_strip'
                {...register('commercialStrip')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='business_hub'
                {...register('businessHub')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='mosque'
                {...register('mosque')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='sports_clubs'
                {...register('sportsClubs')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='bicycles_lanes'
                {...register('bicyclesLanes')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='medical_center'
                {...register('medicalCenter')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='disability_support'
                {...register('disabilitySupport')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='gym'
                {...register('gym')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='swimming_pool'
                {...register('swimmingPool')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='grage'
                {...register('grage')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='basketball'
                {...register('basketBall')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='tennis'
                {...register('tennis')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='laundry'
                {...register('laundry')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='wellness_facilities'
                {...register('wellnessFacilities')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='transportation'
                {...register('transportaion')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='water_features'
                {...register('waterFeature')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='cafes'
                {...register('cafes')}
              >
                <option value='1'>Yes</option>
                <option value='0'>No</option>
              </Select>
              <Select
                size='large'
                placeholder='restaurant'
                {...register('resturant')}
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
              {...register('description')}
            />
          </Box>
          <Box>
            <Text>8.Contact & Delivery</Text>
            <Flex gap={3}>
              <Input
                type='phone'
                size='large'
                placeholder='Phone Number'
                {...register('phone')}
              />
              <Input
                type='text'
                size='large'
                placeholder='Delivery Date'
                {...register('date')}
              />
            </Flex>
          </Box>
          <Button colorScheme='yellow'>Update</Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </Box>
  );
};

export default UpdatePage;
