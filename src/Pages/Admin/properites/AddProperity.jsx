import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Stack, Text, Textarea, Button } from '@chakra-ui/react';
import { Input, InputNumber, Select, Form, Upload } from 'antd';
import { getCompounds } from '../../../redux/thunck/crudCompounds';
import { UploadCloud } from 'lucide-react';

const AddPage = () => {
  const { compounds } = useSelector((state) => state.compounds);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('image', data.image.file);
    console.log(formData.get('image'));
  };
  useEffect(() => {
    dispatch(getCompounds());
  }, [dispatch]);
  return (
    <Box p={5}>
      <Text
        mb={5}
        fontSize={25}
        fontWeight='bold'
        color={'gray.700'}
      >
        Add New Properity
      </Text>
      <Form onFinish={handleSubmit}>
        <Stack>
          <Box>
            <Text
              mb={2}
              fontWeight='bold'
              fontSize={14}
              color={'gray.600'}
            >
              1.Property Details
            </Text>
            <Flex
              gap={3}
              wrap='wrap'
            >
              <Form.Item
                name='compound_id'
                rules={[
                  {
                    required: true,
                    message: 'This Field Is Required..',
                  },
                ]}
              >
                <Select
                  placeholder='Choose Compound'
                  size='large'
                  style={{ width: '170px' }}
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
              </Form.Item>
              <Form.Item
                name='name_en'
                rules={[
                  {
                    required: true,
                    message: 'This Field Is Required..',
                  },
                ]}
              >
                <Input
                  placeholder='Appartment Name..'
                  size='large'
                  style={{ width: '170px' }}
                />
              </Form.Item>
              <Form.Item
                name='name_ar'
                rules={[
                  {
                    required: true,
                    message: 'This Field Is Required..',
                  },
                ]}
              >
                <Input
                  placeholder='ألاسم '
                  size='large'
                  dir='rtl'
                  style={{ width: '170px' }}
                />
              </Form.Item>
              <Form.Item
                name='model_id'
                rules={[
                  {
                    required: true,
                    message: 'This Field Is Required..',
                  },
                ]}
              >
                <Select
                  placeholder='Model..'
                  size='large'
                  style={{ width: '170px' }}
                >
                  <option value='hah'>hhah</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='type_id'
                rules={[
                  {
                    required: true,
                    message: 'This Field Is Required..',
                  },
                ]}
              >
                <Select
                  placeholder='Type..'
                  size='large'
                  style={{ width: '170px' }}
                >
                  <option value='sell'>sell</option>
                  <option value='rent'>Rent</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='sub_id'
                rules={[
                  {
                    required: true,
                    message: 'This Field Is Required..',
                  },
                ]}
              >
                <Select
                  placeholder='Sub Category..'
                  size='large'
                  style={{ width: '170px' }}
                >
                  <option value='sell'>sell</option>
                  <option value='rent'>Rent</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='availability'
                rules={[
                  {
                    required: true,
                    message: 'This Field Is Required..',
                  },
                ]}
              >
                <InputNumber
                  placeholder='Avilabilty..'
                  size='large'
                  style={{ width: '170px' }}
                />
              </Form.Item>
            </Flex>
          </Box>
          <Box>
            <Text
              mb={2}
              fontWeight='bold'
              fontSize={14}
              color={'gray.600'}
            >
              2.Pricing and Financial Information
            </Text>
            <Flex
              gap={3}
              alignItems='center'
            >
              <Form.Item
                name='price_from'
                rules={[{ required: true, message: 'This Field Is required' }]}
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
              </Form.Item>
              <Form.Item
                name='price_to'
                rules={[{ required: true, message: 'This Feild Is Required' }]}
              >
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
              </Form.Item>
            </Flex>
          </Box>
          <Box>
            <Text
              mb={2}
              fontWeight='bold'
              fontSize={14}
              color={'gray.600'}
            >
              3.Location
            </Text>
            <Flex gap={5}>
              <Form.Item
                name='address_en'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Input
                  style={{ width: '250px' }}
                  placeholder='Address...'
                  size='large'
                />
              </Form.Item>
              <Form.Item
                name='address_ar'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Input
                  style={{ width: '250px' }}
                  placeholder='العنوان'
                  size='large'
                  dir='rtl'
                />
              </Form.Item>
              <Form.Item
                name='landmarks'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Input
                  style={{ width: '250px' }}
                  size='large'
                  placeholder='Nearby Landmark...'
                />
              </Form.Item>
            </Flex>
          </Box>
          <Box>
            <Text
              mb={2}
              fontWeight='bold'
              fontSize={14}
              color={'gray.600'}
            >
              4. Amenities and Features
            </Text>
            <Flex
              gap={3}
              wrap='wrap'
            >
              <Form.Item
                name='roooms'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <InputNumber
                  size='large'
                  placeholder='No. Of Rooms'
                  style={{ width: '220px' }}
                />
              </Form.Item>
              <Form.Item
                name='bathrooms'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <InputNumber
                  size='large'
                  placeholder='No. Of Rooms'
                  style={{ width: '220px' }}
                />
              </Form.Item>
              <Form.Item
                name='bedrooms'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <InputNumber
                  size='large'
                  placeholder='No. Of Bed Rooms'
                  style={{ width: '220px' }}
                />
              </Form.Item>
              <Form.Item
                name='master_bedroom'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <InputNumber
                  size='large'
                  placeholder='No. Of Master Bed Rooms'
                  style={{ width: '220px' }}
                />
              </Form.Item>
              <Form.Item
                name='balconies'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <InputNumber
                  size='large'
                  placeholder='No. Of Balcony'
                  style={{ width: '220px' }}
                />
              </Form.Item>
              <Form.Item
                name='kitchens'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <InputNumber
                  size='large'
                  placeholder='No. Of kitchens'
                  style={{ width: '220px' }}
                />
              </Form.Item>
              <Form.Item
                name='wifi'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <Select
                  placeholder='With WIFI...'
                  size='large'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
            </Flex>
          </Box>
          <Box>
            <Text
              mb={2}
              fontWeight='bold'
              fontSize={14}
              color={'gray.600'}
            >
              5.Nearby Services
            </Text>
            <Flex
              gap={3}
              wrap='wrap'
            >
              <Form.Item
                name='parks_and_garden'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='Parks & Gardens'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='schools'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='Schools'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='clubhous'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='Clubhouse'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='commercial_strip'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='commercial_strip'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='business_hub'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='business_hub'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='mosque'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='mosque'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='sports_clubs'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='sports_clubs'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='bicycles_lanes'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='bicycles_lanes'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='medical_center'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='medical_center'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='disability_support'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='disability_support'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='gym'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='gym'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='swimming_pool'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='swimming_pool'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='grage'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='grage'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='basketball'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='basketball'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='tennis'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='tennis'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='laundry'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='laundry'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='garden'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='Gardens'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='wellness_facilities'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='Wellness Facilities'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='transportation'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='Transportions'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='water_features'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='Water Features'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='cafes'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='Cafes'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='restaurant'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='restaurant'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='security'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='Security'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
              <Form.Item
                name='cctv'
                rules={[{ required: true, message: 'This Field Is Required' }]}
              >
                <Select
                  size='large'
                  placeholder='CCTV'
                >
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Select>
              </Form.Item>
            </Flex>
          </Box>
          <Box>
            <Text
              mb={2}
              fontWeight='bold'
              fontSize={14}
              color={'gray.600'}
            >
              6.Media & Documents
            </Text>
            <Flex gap={5}>
              <Form.Item
                name='image'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <Upload
                  {...props}
                  multiple={false}
                >
                  <Button icon={<UploadCloud />}>Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name='images'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <Upload
                  {...props}
                  multiple={true}
                >
                  <Button icon={<UploadCloud />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Flex>
          </Box>
          <Box>
            <Text
              mb={2}
              fontWeight='bold'
              fontSize={14}
              color={'gray.600'}
            >
              7.Description And Tags
            </Text>
            <Flex gap={3}>
              <Form.Item
                name='description_en'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <Textarea
                  resize='none'
                  placeholder='Description'
                  width={550}
                  height={150}
                />
              </Form.Item>
              <Form.Item
                name='description _ar'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <Textarea
                  resize='none'
                  placeholder='الوصف'
                  width={550}
                  height={150}
                  dir='rtl'
                />
              </Form.Item>
            </Flex>
          </Box>
          <Box>
            <Text
              mb={2}
              fontWeight='bold'
              fontSize={14}
              color={'gray.600'}
            >
              8.Contact & Delivery
            </Text>
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
          <Button
            colorScheme='teal'
            type='submit'
          >
            Update
          </Button>
        </Stack>
      </Form>
    </Box>
  );
};

export default AddPage;
