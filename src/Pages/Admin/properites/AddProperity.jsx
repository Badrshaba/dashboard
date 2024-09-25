import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Stack, Text, Textarea, Button, AvatarBadge, FormLabel } from '@chakra-ui/react';
import { Input, InputNumber, Select, Form, Upload } from 'antd';
import { getCompounds } from '../../../redux/thunck/crudCompounds';
import { UploadCloud } from 'lucide-react';
import { getStatus, getTypes } from '../../../redux/thunck/crudOthers';
import { getAllSubCategories, getAllSubCategoriesById } from '../../../redux/thunck/subCategoriesAsync';
import { baseURL, getUsersApi } from '../../../utils/api';
import { getAllCategories } from '../../../redux/thunck/crudCategories';

const AddPage = () => {
  const { compounds } = useSelector((state) => state.compounds);
  const { types } = useSelector((state) => state.types);
  const { status } = useSelector((state) => state.status);
  const { categories } = useSelector((state) => state.categories);
  const { subCategoriesAdd } = useSelector((state) => state.subCategories);
  const [fileList, setFileList] = useState([]);
  const [file,setFile] = useState(null) 
  const [script,setScript] = useState(null) 
  const [model,setModel] = useState([])
  const dispatch = useDispatch();

  const handleSubmit = async(data) => {
    console.log(data);
    const formData = new FormData()
    for (const key in data) {
      formData.append(key,data[key])
     }
    // formData.append('description_en',data.description_en)
    // formData.append('description_ar',data.description_ar)
    // formData.append('address_en',data.address_en)
    // formData.append('address_ar',data.address_ar)
    // formData.append('price_to',data.price_to)
    // formData.append('area',+data.area)
    // formData.append('price_from',data.price_from)
    // formData.append('availability',data.availability)
    // formData.append('model_id',data.model_id)
    // formData.append('compound_id',data.compound_id)
    // formData.append('status_id',data.status_id)
    // formData.append('sub_id',data.sub_id)
    // formData.append('type_id',data.type_id)
    formData.append('user_id',JSON.parse(localStorage.getItem('user')).id)
    formData.append('image', file);
    formData.append('script', script);
    for (let index = 0; index < fileList.length; index++) {
      formData.append('images[]', fileList[index]);
    }
    console.log(formData.get('image'));
    console.log(formData.getAll('images[]'));
    try {
      let { data } = await baseURL({
        method: 'post',
        url: '/apartments',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          APP_KEY: import.meta.env.VITE_APP_KEY,
          Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
        },
      });
      
      console.log(data);
      
    } catch (error) {
      console.log(error);
    //  setError(error?.response?.data || error?.message);
       
     }
  };
  const handleInputChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      setFileList((prev) => [...prev, e.target.files[i]]);
    }
  }
  const getAllModal = async(id)=>{
    try {
      const {data} = await getUsersApi.get(`model/compound/${id}`)
      setModel(data?.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    dispatch(getCompounds());
    dispatch(getTypes())
    dispatch(getStatus())
    dispatch(getAllCategories())
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
                  onChange={(e)=>getAllModal(e)}
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
                name='category_id'
                rules={[
                  {
                    required: true,
                    message: 'This Field Is Required..',
                  },
                ]}
              >
                <Select
                  placeholder='Category '
                  size='large'
                  style={{ width: '170px' }}
                  onChange={(e)=>dispatch(getAllSubCategoriesById(e))}
                >
                  {categories?.map((category) => (
                    <option
                      value={category.id}
                      key={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='area'
                rules={[
                  {
                    required: true,
                    message: 'This Field Is Required..',
                  },
                ]}
              >
                <Input
                  placeholder='area'
                  size='large'
                  type='number'
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
                  {model?.map((item) => (
                    <option
                      value={item.id}
                      key={item.id}
                    >
                      {item.name}
                    </option>
                  ))}

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
                {types?.map((type) => (
                    <option
                      value={type.id}
                      key={type.id}
                    >
                      {type.name}
                    </option>
                  ))}
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
                  {subCategoriesAdd?.map((subCategorie) => (
               
                    <option
                      value={subCategorie.id}
                      key={subCategorie.id}
                    >
                      {subCategorie.name}
                    </option>
                 
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name='status_id'
                rules={[
                  {
                    required: true,
                    message: 'This Field Is Required..',
                  },
                ]}
              >
                <Select
                  placeholder='Status..'
                  size='large'
                  style={{ width: '170px' }}
                >
                  {status?.map((stat) => (
                    <option
                      value={stat.id}
                      key={stat.id}
                    >
                      {stat.name}
                    </option>
                  ))}
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
                name='rooms'
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
                  placeholder='No. Of bathrooms'
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
                name='clubhouse'
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
              {/* <Form.Item
                name='image'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <Upload
                  {...props}
                  multiple={false}
                >
                  <Button icon={<UploadCloud />}>Upload</Button>
                </Upload>
              </Form.Item> */}
              <input type="file" required onChange={(e) => setFile(e.target.files[0])} />
              <input type="file" required multiple onChange={(e) => handleInputChange(e)} />
              {/* <Form.Item
                name='images'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <Upload
                  {...props}
                  multiple={true}
                >
                  <Button icon={<UploadCloud />}>Upload</Button>
                </Upload>
              </Form.Item> */}
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
                  backgroundColor={'white'}
                  width={550}
                  height={150}
                />
              </Form.Item>
              <Form.Item
                name='description_ar'
                rules={[{ required: true, message: 'This Field Is required' }]}
              >
                <Textarea
                  resize='none'
                  placeholder='الوصف'
                  backgroundColor={'white'}
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
              8.Delivery&Script
            </Text>
            <Flex gap={3} alignItems='center' >
            <Form.Item  name='delivery_in'
                rules={[{ required: true, message: 'This Field Is required' }]}
                style={{width:"170px"}}
                >
              <Input
                type='text'
                size='large'
                placeholder='Delivery Date'
              />
            </Form.Item>
        
              <Input type='file' onChange={(e) => setScript(e.target.files[0])} />
          
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
