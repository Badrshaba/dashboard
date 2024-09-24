import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, Stack, Text, Textarea, Button, FormLabel, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Image, Input,  Select } from 'antd';
import { getProperityById } from '../../../redux/thunck/crudProperites';
import { apiRegister, bannersApi, baseURL, getUsersApi } from '../../../utils/api';
import Selector from '../../../componants/form/Selector';
import { getStatus, getTypes } from '../../../redux/thunck/crudOthers';
import { getAllSubCategories } from '../../../redux/thunck/subCategoriesAsync';
import { getCompounds } from '../../../redux/thunck/crudCompounds';

const UpdatePage = () => {
  const { compounds } = useSelector((state) => state.compounds);
   const { types } = useSelector((state) => state.types);
   const { status } = useSelector((state) => state.status);
   const { subCategories } = useSelector((state) => state.subCategories);
  const { properiteId } = useParams();
const [formData,setFormData] = useState(null)
const [model,setModel] = useState(null)
const [loading,setLoading] = useState(false)
const nameRef = useRef()
//console.log(nameRef);
const [errors,setErrors] = useState({
  name_ar:'',
  name_en:'',
  address_en:"",
  address_ar:"",
  description_en:"",
  description_ar:"",
  area:'',
  price_from:'',
  price_to:'',
  availability:'',
  kitchens:"",
  balconies:"",
  rooms:"",
  master_bedroom:"",
  bedrooms:'',
  delivery_in:''
})

  const dispatch = useDispatch();
  const onSubmit =async(e)=>{
    e.preventDefault();
    if(formData.name_en=='') return setErrors((prevData)=>({
      ...prevData,
      name_en:"name is requared"
    }))
    if(formData.name_ar=='') return setErrors((prevData)=>({
      ...prevData,
      name_ar:"الاسم اجباري"
    }))
    if(formData.area=='') return setErrors((prevData)=>({
      ...prevData,
      area:'area is requared'
    }))
    if(formData.availability=='') return setErrors((prevData)=>({
      ...prevData,
      availability:'availability is requared'
    }))
    if(formData.price_from=='') return setErrors((prevData)=>({
      ...prevData,
      price_from:'price from is requared'
    }))
    if(formData.price_to=='') return setErrors((prevData)=>({
      ...prevData,
      price_to:'price to is requared'
    }))
    if(formData.address_en=='') return setErrors((prevData)=>({
      ...prevData,
      address_en:"address is requared"
    }))
    if(formData.address_ar=='') return setErrors((prevData)=>({
      ...prevData,
      address_ar:"العنوان اجباري"
    }))
    if(formData.description_ar=='') return setErrors((prevData)=>({
      ...prevData,
      description_ar:"الوصف اجباري"
    }))
    if(formData.description_en=='') return setErrors((prevData)=>({
      ...prevData,
      description_en:'description is requared'
    }))
    if(formData.balconies=='') return setErrors((prevData)=>({
      ...prevData,
      balconies:'balconies is requared'
    }))
    if(formData.bedrooms=='') return setErrors((prevData)=>({
      ...prevData,
      bedrooms:'bedrooms is requared'
    }))
    if(formData.delivery_in=='') return setErrors((prevData)=>({
      ...prevData,
      delivery_in:'delivery in is requared'
    }))
    if(formData.kitchens=='') return setErrors((prevData)=>({
      ...prevData,
      kitchens:'kitchens is requared'
    }))
    if(formData.master_bedroom=='') return setErrors((prevData)=>({
      ...prevData,
      master_bedroom:'master bedroom is requared'
    }))
    if(formData.rooms=='') return setErrors((prevData)=>({
      ...prevData,
      rooms:'rooms is requared'
    }))
   setLoading(true)
   const formDataSend = new FormData();
   for (const key in formData) {
    formDataSend.append(key,formData[key])
   }
try {
  let { data } = await baseURL({
    method: 'post',
    url: `/apartments/${properiteId}?_method=PUT`,
    data: formDataSend,
    headers: {
      'Content-Type': 'multipart/form-data',
      APP_KEY: import.meta.env.VITE_APP_KEY,
      Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
    },
  });
  console.log(data);
  setLoading(false)
} catch (error) {
  console.log(error);
  setLoading(false)
}
  }
  const handleChange = (e) => {

    const { name, value } = e.target;
    if ( name != 'description_en' && name != 'description_ar'&& value.length > 50) {
      return setErrors((prevData)=>({
        ...prevData,
        [name]:"max length is 50  "
      }))
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getProperityById = async(id)=>{
    try {
      const { data } = await apiRegister.get(`/apartments/${id}`);
      setFormData(data?.data)
      //return data?.data;
    } catch (error) {
      console.log(error);
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
console.log(formData);
 // console.log(model);
  useEffect(()=>{
    getProperityById(properiteId)
    dispatch(getTypes())
    dispatch(getStatus())
    dispatch(getAllSubCategories())
    dispatch(getCompounds())
  },[])
  useEffect(()=>{
    if (formData) {
      getAllModal(formData?.compound_id)
    }
  },[formData])
 // console.log(formData);
  return (
    <Box p={5}>
      <form onSubmit={onSubmit} >
        <Stack space={20}>
          <Box>
            <FormLabel>1.Property Details</FormLabel>
            <Flex gap={5}>
<div className=' flex flex-wrap space-x-3'>
            <div className=' flex flex-col'  >
            <Text fontSize={12} >Compound </Text>
              <Select
                placeholder='Choose Compound'
                size='large'
                value={formData?.compound_id}
                style={{ width: '170px' }}
                name='compound_id'
                onChange={(e)=>{getAllModal(e)
                   setFormData((prevData) => ({...prevData,compound_id: e,}))}}
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
              </div>

              <div className=' flex flex-col' >
              <FormControl isInvalid={errors?.name_en}>
              <Text fontSize={12}>Name </Text>
              <Input
                placeholder='Properity Name...'
                size='large'
                name='name_en'
              value={formData?.name_en}
              onChange={handleChange}
              style={{ width: '170px' }}
              />
              <FormErrorMessage>{errors?.name_en}</FormErrorMessage>
              </FormControl>
              </div>
              <div style={{ direction:'rtl' }} className=' flex flex-col '  >
              <FormControl isInvalid={errors?.name_ar}>
            <Text fontSize={12}>اسم الوحده </Text>
              <Input
                placeholder='اسم الوحده'
                size='large'
                name='name_ar'
                value={formData?.name_ar}
              onChange={handleChange}
              style={{ width: '170px' }}
              />
              <FormErrorMessage>{errors?.name_ar}</FormErrorMessage>
              </FormControl>
              </div>
              <div className=' flex flex-col' >
              <FormControl isInvalid={errors?.area}>
              <Text fontSize={12}>Area </Text>
              <Input
                placeholder='Area...'
                size='large'
                name='area'
              value={formData?.area}
              onChange={handleChange}
              style={{ width: '100px' }}
              />
              <FormErrorMessage>{errors?.area}</FormErrorMessage>
              </FormControl>
              </div>
              <div className=' flex flex-col'  >
            <Text fontSize={12} >Modal </Text>
              <Select
                placeholder='Choose Modal'
                size='large'
                value={formData?.model_id}
                style={{ width: '100px' }}
                onChange={(e)=>{setFormData((prevData) => ({...prevData,model_id: e,}))}}
              >
                {model?.map((mod) => (
                  <option
                    value={mod.id}
                    key={mod.id}
                  >
                    {mod.name}
                  </option>
                ))}
              </Select>
              </div>
              <div className=' flex flex-col'  >
            <Text fontSize={12} >Type </Text>
              <Select
                placeholder='Choose Type'
                size='large'
                value={formData?.type_id}
                style={{ width: '100px' }}
                onChange={(e)=>{setFormData((prevData) => ({...prevData,type_id: e,}))}}
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
              </div>
              <div className=' flex flex-col w-24'  >
            <Text fontSize={12} >Sub Category </Text>
              <Select
                placeholder='Choose Sub'
                size='large'
                value={formData?.sub_id}
                style={{ width: '100px' }}
                handleChange={(e)=>{setFormData((prevData) => ({...prevData,sub_id: e,}))}}
              >
                {subCategories?.map((subCategory) => (
                  <option
                    value={subCategory.id}
                    key={subCategory.id}
                  >
                    {subCategory.name}
                  </option>
                ))}
              </Select>
              </div>
              <div className=' flex flex-col '  >
            <Text fontSize={12} >Status </Text>
              <Select
                placeholder='Choose Sub'
                size='large'
                value={formData?.status_id}
                style={{ width: '100px' }}
                onChange={(e)=>{setFormData((prevData) => ({...prevData,status_id: e,}))}}
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
              </div>
              <div className=' flex flex-col' >
              <FormControl isInvalid={errors?.availability}>
              <Text fontSize={12}>Availability </Text>
              <Input
                placeholder='Availability...'
                size='large'
                name='availability'
              value={formData?.availability}
              onChange={handleChange}
              style={{ width: '100px' }}
              />
              <FormErrorMessage>{errors?.availability}</FormErrorMessage>

              </FormControl>
              </div>
</div>
            </Flex>
          </Box>
          <Box>
          <FormLabel>2.Pricing and Financial Information</FormLabel>
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
                <FormControl isInvalid={errors?.price_from}>
                <Input
                  style={{ width: '180px' }}
                  size='large'
                  placeholder='Start Price...'
                  name='price_from'
                 value={formData?.price_from}
                onChange={handleChange}
                 />
                   <FormErrorMessage>{errors?.price_from}</FormErrorMessage>

                </FormControl>
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
                <FormControl isInvalid={errors?.price_to}>
                <Input
                  style={{ width: '180px' }}
                  size='large'
                  placeholder='Maxmuim Price...'
                  name='price_to'
                  value={formData?.price_to}
                  onChange={handleChange}
                />
                 <FormErrorMessage>{errors?.price_to}</FormErrorMessage>
                </FormControl>
              </Flex>
            </Flex>
          </Box>
          <Box>
            <FormLabel>3.Location</FormLabel>
            <Flex gap={5}>
            <div className=' flex flex-col' >
            <FormControl isInvalid={errors?.address_en}>
            <Text fontSize={12}>Address </Text>
              <Input
                style={{ width: '250px' }}
                placeholder='Address...'
                size='large'
                name='address_en'
                value={formData?.address_en}
                onChange={handleChange}
              />
                 <FormErrorMessage>{errors?.address_en}</FormErrorMessage>

            </FormControl>
            </div>
            <div style={{direction:'rtl'}} className=' flex flex-col'>
            <FormControl isInvalid={errors?.address_ar}>
            <Text fontSize={12}>العنوان </Text>
              <Input
                style={{ width: '250px'}}
                size='large'
                placeholder='العنوان'
                name='address_ar'
               value={formData?.address_ar}
               onChange={handleChange}
              />
              <FormErrorMessage>{errors?.address_ar}</FormErrorMessage>
            </FormControl>
            </div>
            </Flex>
          </Box>
          <Box>
            <FormLabel>4. Amenities and Features </FormLabel>
            <Flex
              gap={3}
              wrap='wrap'
            >
              <div className=' flex flex-col' >
              <FormControl isInvalid={errors?.rooms}>
              <Text fontSize={12}>Rooms </Text>
              <Input
                size='large'
                placeholder='No. Of Rooms'
                style={{ width: '220px' }}
                name='rooms'
                value={formData?.rooms}
                onChange={handleChange}
                />
              <FormErrorMessage>{errors?.rooms}</FormErrorMessage>
              </FormControl>
              </div>
              <div className=' flex flex-col' >
              <FormControl isInvalid={errors?.master_bedroom}>
              <Text fontSize={12}>Master bedroom </Text>
              <Input
                size='large'
                placeholder='No. Of Master Bed Rooms'
                name='master_bedroom'
                style={{ width: '220px' }}
                value={formData?.master_bedroom}
                onChange={handleChange}
                />
              <FormErrorMessage>{errors?.master_bedroom}</FormErrorMessage>
              </FormControl>
              </div>
              <div className=' flex flex-col' >
              <FormControl isInvalid={errors?.bedrooms}>
              <Text fontSize={12}>Bed Room </Text>
              <Input
                size='large'
                placeholder='No. Of Bed Rooms'
                style={{ width: '220px' }}
                name='bedrooms'
                value={formData?.bedrooms}
                onChange={handleChange}
                />
              <FormErrorMessage>{errors?.bedrooms}</FormErrorMessage>
              </FormControl>
              </div>
              <div className=' flex flex-col' >
              <FormControl isInvalid={errors?.bathrooms}>
              <Text fontSize={12}>BathRooms </Text>
              <Input
                size='large'
                type='number'
                placeholder='No. Of BathRooms'
                style={{ width: '220px' }}
                ref={nameRef}
                value={formData?.bathrooms}
                name='bathrooms'
                onChange={handleChange}
                />
                <FormErrorMessage>{errors?.bathrooms}</FormErrorMessage>

              </FormControl>
              </div>
              <div className=' flex flex-col' >
              <FormControl isInvalid={errors?.balconies}>
                <Text fontSize={12}>Balcony </Text>
              <Input
                size='large'
                placeholder='No. Of Balcony'
                style={{ width: '220px' }}
                name='balconies'
                value={formData?.balconies}
                onChange={handleChange}
                />
                <FormErrorMessage>{errors?.balconies}</FormErrorMessage>
              </FormControl>
              </div>
              <div className=' flex flex-col' >
              <FormControl isInvalid={errors?.kitchens}>
              <Text fontSize={12}>kitchens </Text>
              <Input
                size='large'
                placeholder='No. Of kitchens'
                style={{ width: '220px' }}
                name='kitchens'
                value={formData?.kitchens}
                onChange={handleChange}
                />
                <FormErrorMessage>{errors?.kitchens}</FormErrorMessage>
              </FormControl>
              </div>
              <div className=' flex flex-col' >
                <Text fontSize={12}>Wifi </Text>
              <Select
                style={{ width: '100px' }}
                placeholder='With WIFI...'
                size='large'
                name='wifi'
                value={formData?.wifi}
                onChange={(e)=>{setFormData((prevData) => ({...prevData,wifi: e,}))}}
              >
                <option value={1}>Yes</option>
                <option value={0}>No</option>
              </Select>
              </div>
            </Flex>
          </Box>
          <Box>
            <FormLabel>5.Nearby Services</FormLabel>
            <Flex
              gap={3}
              wrap='wrap'
            >
              <Selector placeholder={'Parks And Garden'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,parks_and_garden: e,}))}} name={'parks_and_garden'} value={formData?.parks_and_garden} />
              <Selector placeholder={'Schools'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,schools: e,}))}} name={'schools'} value={formData?.schools} />
              <Selector placeholder={'Commercial strip'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,commercial_strip: e,}))}} name={'commercial_strip'} value={formData?.commercial_strip} />
              <Selector placeholder={'Business hub'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,business_hub: e,}))}} name={'business_hub'} value={formData?.business_hub} />
              <Selector placeholder={'mosque'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,mosque: e,}))}} name={'mosque'} value={formData?.mosque} />
              <Selector placeholder={'Club house'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,clubhouse: e,}))}} name={'clubhouse'} value={formData?.clubhouse} />
              <Selector placeholder={'Sports clubs'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,sports_clubs: e,}))}} name={'sports_clubs'} value={formData?.sports_clubs} />
              <Selector placeholder={'Bicycles lanes'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,bicycles_lanes: e,}))}} name={'bicycles_lanes'} value={formData?.bicycles_lanes} />
              <Selector placeholder={'Medical center'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,medical_center: e,}))}} name={'medical_center'} value={formData?.medical_center} />
              <Selector placeholder={'Disability support'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,disability_support: e,}))}} name={'disability_support'} value={formData?.disability_support} />
              <Selector placeholder={'Gym'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,gym: e,}))}} name={'gym'} value={formData?.gym} />
              <Selector placeholder={'Swimming pool'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,swimming_pool: e,}))}} name={'swimming_pool'} value={formData?.swimming_pool} />
              <Selector placeholder={'Grage'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,grage: e,}))}} name={'grage'} value={formData?.grage} />
              <Selector placeholder={'Basketball'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,basketball: e,}))}} name={'basketball'} value={formData?.basketball} />
              <Selector placeholder={'Tennis'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,tennis: e,}))}} name={'tennis'} value={formData?.tennis} />
              <Selector placeholder={'Laundry'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,laundry: e,}))}} name={'laundry'} value={formData?.laundry} />
              <Selector placeholder={'Wellness facilities'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,wellness_facilities: e,}))}} name={'wellness_facilities'} value={formData?.wellness_facilities} />
              <Selector placeholder={'Transportation'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,transportation: e,}))}} name={'transportation'} value={formData?.transportation} />
              <Selector placeholder={'Water features'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,water_features: e,}))}} name={'water_features'} value={formData?.water_features} />
              <Selector placeholder={'Cafes'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,cafes: e,}))}} name={'cafes'} value={formData?.cafes} />
              <Selector placeholder={'Restaurant'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,restaurant: e,}))}} name={'restaurant'} value={formData?.restaurant} />
              <Selector placeholder={'Security'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,security: e,}))}} name={'security'} value={formData?.security} />
              <Selector placeholder={'cctv'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,cctv: e,}))}} name={'cctv'} value={formData?.cctv} />
              <Selector placeholder={'Garden'} size={'large'} handleChange={(e)=>{setFormData((prevData) => ({...prevData,garden: e,}))}} name={'garden'} value={formData?.garden} />
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
            <Flex gap={5} alignItems='center'>
 
              <input type="file" onChange={(e) => setFormData((prevData) => ({...prevData,image: e.target.files[0]}))} />
              <Image width={100} src={formData?.image} />
   
            </Flex>
          </Box>
          <Box>
            
            <FormLabel>7.Description And Tags</FormLabel>
                <div className=' flex space-x-2'>
                <div className=' flex flex-col'>
          <FormControl isInvalid={errors?.description_en}>
            <Text fontSize={12}>Description </Text>
            <Textarea
              resize='none'
              placeholder='Description'
              width={550}
              height={150}
              name='description_en'
              backgroundColor={'white'}
              value={formData?.description_en}
              onChange={handleChange}
              />
             <FormErrorMessage>{errors?.description_en}</FormErrorMessage>

              </FormControl>
            </div>
            <div style={{direction:'rtl'}} className=' flex flex-col' >
            <FormControl isInvalid={errors?.description_ar}>
            <Text fontSize={12}>الوصف </Text>
            <Textarea
              resize='none'
              placeholder='الوصف'
              width={550}
              height={150}
              name='description_ar'
              value={formData?.description_ar}
              backgroundColor={'white'}
              onChange={handleChange}
            />
               <FormErrorMessage>{errors?.description_ar}</FormErrorMessage>
            </FormControl>
            </div>
</div>
          </Box>
          <Box>
          <FormControl isInvalid={errors?.delivery_in}>   
            <Text>8.Delivery</Text>
            <Flex gap={3}>
              <Input
                type='text'
                size='large'
                placeholder='Delivery Date'
                value={formData?.delivery_in}
                onChange={handleChange}
                style={{width:'170px'}}
              />
            </Flex>
            <FormErrorMessage>{errors?.delivery_in}</FormErrorMessage>

          </FormControl>
          </Box>
          <Button type='submit' isLoading={loading} colorScheme='yellow'>Update</Button>
        </Stack>
      </form>
     
    </Box>
  );
};

export default UpdatePage;
