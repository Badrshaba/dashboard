import {
  Modal,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  InputLeftAddon,
  InputGroup,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { baseURL } from '../../../utils/api';
import { getCompounds } from '../../../redux/thunck/crudCompounds';
import { useDispatch } from 'react-redux';
import FileInput from '../../../componants/file-input/FileInput';
const FormCompound = ({ onClose, isOpen, formData,zones,setFormData,setErrors,errors,Files,File,Script }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const selectRef = useRef(null);
  const [files,setFiles] = Files
  const [file,setFile] = File
  const [script,setScript] = Script
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.name_en=='') return setErrors((prevData)=>({
      ...prevData,
      name_en:"name is requered"
    }))
    if(formData.description_en=='') return setErrors((prevData)=>({
      ...prevData,
      description_en:"description is requered"
    }))
    if(formData.area=='') return setErrors((prevData)=>({
      ...prevData,
      area:"area is requered"
    }))
    if(formData.address_en=='') return setErrors((prevData)=>({
      ...prevData,
      address_en:"address is requered"
    }))
    if(formData.price_to=='') return setErrors((prevData)=>({
      ...prevData,
      price_to:"price to is requered"
    }))
    if(formData.price_form=='') return setErrors((prevData)=>({
      ...prevData,
      price_form:"price form is requered"
    }))
    if(formData.name_ar=='') return setErrors((prevData)=>({
      ...prevData,
      name_ar:"الاسم اجباري"
    }))
    if(formData.address_ar=='') return setErrors((prevData)=>({
      ...prevData,
      address_ar:"العنوان اجباري"
    }))
    if(formData.description_ar=='') return setErrors((prevData)=>({
      ...prevData,
      description_ar:"الوصف اجباري"
    }))
    
    if(!file.length) return setErrors((prevData)=>({
      ...prevData,
      img:"image is requered"
    }))
    setLoading(true);
    const formDataSend = new FormData();
    formDataSend.append('name_ar', formData.name_ar);
    formDataSend.append('name_en', formData.name_en);
    formDataSend.append('description_en', formData.description_en);
    formDataSend.append('description_ar', formData.description_ar);
    formDataSend.append('area', formData.area);
    formDataSend.append('address_ar', formData.address_ar);
    formDataSend.append('address_en', formData.address_en);
    formDataSend.append('price_to', formData.price_to);
    formDataSend.append('price_from', formData.price_from);
    formDataSend.append('zone_id', selectRef?.current?.value);
    formDataSend.append('user_id', JSON.parse(localStorage.getItem('user')).id);
    formDataSend.append('image', file[0]);
    formDataSend.append('script',script[0] );
    for (let index = 0; index < files.length; index++) {
      formDataSend.append('images[]', files[index]);
    }
    console.log(formDataSend.get('user_id'));
    try {
      let { data } = await baseURL({
        method: 'post',
        url: '/compounds',
        data: formDataSend,
        headers: {
          'Content-Type': 'multipart/form-data',
          APP_KEY: import.meta.env.VITE_APP_KEY,
          Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
        },
      });
      setLoading(false);
      setTimeout(() => {
        onClose();
      }, 500);
      console.log(data);
      dispatch(getCompounds());
    } catch (error) {
      console.log(error);
    //  setError(error?.response?.data || error?.message);
       setLoading(false);
     }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={'5xl'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Compounds</ModalHeader>
        <ModalCloseButton />
        <VStack spacing={4}>
          <form
            className='p-5 w-full'
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className=' flex space-x-3 w-full'>
              <div className='w-full space-y-2'>
                <FormControl isInvalid={errors?.name_en}>
                  <FormLabel>Name :</FormLabel>
                  <Input
                    colorScheme={'red'}
                    name='name_en'
                    type='text'
                    value={formData.name_en}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors?.name_en}</FormErrorMessage>
                </FormControl>
                  <FormControl isInvalid={errors?.img} >
                <FileInput
                  lable='Image :'
                  title='bunner Image'
                  filesHandler={setFile}
                  files={file}
                  />
                  <FormErrorMessage>{errors?.img}</FormErrorMessage>
              </FormControl>
                <FormControl  >
                  <FormLabel>Zone :</FormLabel>
                  <Select ref={selectRef}>
                    {zones?.length &&
                      zones.map((ele) => (
                        <option
                          key={ele.id}
                          value={ele.id}
                        >
                          {ele.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl isInvalid={errors?.area}>
                  <FormLabel>Area :</FormLabel>
                  <Input
                    type='text'
                    name='area'
                    value={formData.area}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors?.area}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.address_en} >
                  <FormLabel>Address :</FormLabel>
                  <Input
                    type='text'
                    name='address_en'
                    value={formData.location_en}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors?.address_en}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.price_from} >
                  <FormLabel className='focus-visible:border-black'>Price from :</FormLabel>
                  <Input
                    type='number'
                    name='price_from'
                    value={formData.price_from}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors?.price_from}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.price_to} >
                  <FormLabel className='focus-visible:border-black'>Price to :</FormLabel>
                  <Input
                    type='number'
                    name='price_to'
                    value={formData.price_to}
                    onChange={handleChange}
                    />
                    <FormErrorMessage>{errors?.price_to}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.description_en} >
                <label className=' w-full'>
                  <FormLabel> Description :</FormLabel>
                  <textarea
                    onChange={handleChange}
                    value={formData.description_en}
                    name='description_en'
                    className={ errors?.description_en? 'outline-red-600 border-solid p-2 rounded-lg h-28  w-full transition-all focus:outline-blue-500 duration-200 border-2':`  p-2 rounded-lg h-28  w-full transition-all focus:outline-blue-500 duration-200 border-2`}
                    type='text'
                    />
                    <FormErrorMessage>{errors?.description_en}</FormErrorMessage>
                </label>

                </FormControl>
              </div>
              <div
                style={{ direction: 'rtl' }}
                className='w-full space-y-2'
              >
                <FormControl isInvalid={errors?.name_ar}>
                  <FormLabel> الاسم :</FormLabel>
                  <Input
                    type='text'
                    name='name_ar'
                    value={formData.name_ar}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>{errors?.name_ar}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.address_ar} >
                  <FormLabel> العنوان : </FormLabel>
                  <Input
                    type='text'
                    name='address_ar'
                    value={formData.address_ar}
                    onChange={handleChange}
                    />
                    <FormErrorMessage>{errors?.address_ar}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors?.description_ar} >
                <label className=' w-full'>
                  <FormLabel> الوصف :</FormLabel>
                  <textarea
                    name='description_ar'
                    onChange={handleChange}
                    value={formData.description_ar}
                    className=' p-2 rounded-lg h-28 w-full border-2 transition-all focus:outline-blue-500 duration-200'
                    type='text'
                    size={'lg'}
                    />
                    <FormErrorMessage>{errors?.description_ar}</FormErrorMessage>
                </label>
                    </FormControl>
                <FormControl>
                <FormLabel> images :</FormLabel>
                <Input type='file' onChange={(e) => setFiles((prev) =>[...prev, e.target.files[0]])} />
              </FormControl>
                <FormControl>
                <FormLabel> Script :</FormLabel>
                <Input type='file' onChange={(e) => setScript(e.target.files)} />
              </FormControl>

              </div>
            </div>
            <Button
              colorScheme='teal'
              width='100%'
              type='submit'
              isLoading={loading}
              mt={4}
            >
              Submit
            </Button>
          </form>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default FormCompound;
