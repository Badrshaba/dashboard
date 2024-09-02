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
} from "@chakra-ui/react";
import { useState } from "react";
import { baseURL } from "../../utils/api";
import { getCompounds } from "../../redux/thunck/crudCompounds";
import { useDispatch } from "react-redux";
import { Upload } from "antd";
import { Trash, UploadIcon } from "lucide-react";
const FormCompound = ({ onClose, isOpen, formData, handleChange }) => {
  const [selectedFile, setSelectedFile] = useState([]);
 const [loading,setLoading] =  useState(false)
 const [error,setError] =  useState(null)
 const [select,setSelector] = useState('')
 const [validation,setValidation] = useState({})
 const dispatch = useDispatch();
  const handleSubmit = async (e) => {
e.preventDefault();

  // if(formData.name_en==''){
  //   return setValidation({...validation,name_en:true})
  // }
  // if(formData.name_ar==''){
  //   return setValidation({...validation,name_ar:true})
  // }
  // if(formData.descriotion_ar==''){
  //    setValidation({...validation,descriotion_ar:true})
  // }
  // if(formData.descriotion_en==''){
  //    setValidation({...validation,descriotion_en:true})
  // }
  // if(formData.area_min==''){
  //    setValidation({...validation,area_min:true})
  // }
  // if(formData.area_max==''){
  //    setValidation({...validation,area_max:true})
  // }
  // if(formData.address_ar==''){
  //    setValidation({...validation,address_ar:true})
  // }
  // if(formData.address_en==''){
  //    setValidation({...validation,address_en:true})
  // }


    setLoading(true)
    const formDataSend = new FormData();
    // formDataSend.append("name_ar", formData.name_ar);
    // formDataSend.append("name_en", formData.name_en);
    // formDataSend.append("description_en", formData.descriotion_ar);
    // formDataSend.append("description_ar", formData.descriotion_en);
    // formDataSend.append("area_min", formData.area_min);
    // formDataSend.append("area_max", formData.area_max);
    // formDataSend.append("address_ar", formData.address_ar);
    // formDataSend.append("address_en", formData.address_en);
    // formDataSend.append("price_min", formData.price_min);
    // formDataSend.append("price_max", formData.price_max);
    // formDataSend.append("zone_id",'1');
    // formDataSend.append("user_id", '1');
     formDataSend.append("compound_id", '1');
    //  selectedFile.forEach((file)=>{
      for (let index = 0; index < selectedFile.length; index++) {
      
        
        formDataSend.append("image[]", selectedFile[index]);
        
      }
     console.log(formDataSend.getAll('image[]'));
    //  })
  
    try {
      let { data } = await baseURL({
        method: "post",
        url: "/compound/image",
        data: formDataSend,
        headers: {
           "Content-Type": "multipart/form-data",
         //  "Accept": "application/json",
          APP_KEY: import.meta.env.VITE_APP_KEY,
        },
      });
      setLoading(false)
      setTimeout(()=>{
        onClose()
      },500)
console.log(data);
     // dispatch(getCompounds());
    } catch (error) {
      console.log(error);
      setError(error?.response?.data || error?.message);
      setLoading(false)
    }
  };
  const props = {
    action: 'https://ai.w-manage.org/api/compound/image',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        setSelectedFile(fileList)
      }
    },

    showUploadList: {
      extra: ({ size = 0 }) => (
        <span
          style={{
            color: '#cccccc',
          }}
        >
          ({(size / 1024 / 1024).toFixed(2)}MB)
        </span>
      ),
      showDownloadIcon: true,
      downloadIcon: 'Download',
      showRemoveIcon: true,
      removeIcon: <Trash onClick={(e) => console.log(e, 'custom removeIcon event')} />,
    },
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Compounds</ModalHeader>
        <ModalCloseButton />
        {/* {error && (
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>{error?.data[0]}</AlertTitle>
      </Alert>
    )} */}
        <VStack spacing={4}>
          <form className="p-5 w-full" onSubmit={(e)=>handleSubmit(e)} >
            <div className=" flex space-x-3 w-full">
              <div className="w-full space-y-2">
                <FormControl isInvalid={validation.name_en}>
                  <FormLabel>Name :</FormLabel>
                  <Input
                    colorScheme={"red"}
                    name="name_en"
                    type="text"
                    value={formData.name_en}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>Name is required</FormErrorMessage>
                </FormControl>
                <FormControl  >
                <FormLabel>Zone :</FormLabel>
                <Select onChange={(event)=>setSelector(event.target.value)}  value={select} >
                  <option value='1'>1</option>
                </Select>
              </FormControl>
                <FormControl isInvalid={validation.area_min} >
                  <FormLabel>Area Min :</FormLabel>
                  <Input
                    type="text"
                    name="area_min"
                    value={formData.area_min}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>Area min is required</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={validation.area_max} >
                  <FormLabel>Area Max :</FormLabel>
                  <Input
                    type="text"
                    name="area_max"
                    value={formData.area_max}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Address :</FormLabel>
                  <Input
                    type="text"
                    name="address_en"
                    value={formData.location_en}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel className="focus-visible:border-black">
                  Price Min :
                  </FormLabel>
                  <Input
                    type="number"
                    name="price_min"
                    value={formData.price_min}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel className="focus-visible:border-black">
                    Price Max :
                  </FormLabel>
                  <Input
                    type="number"
                    name="price_max"
                    value={formData.price_max}
                    onChange={handleChange}
                  />
                </FormControl>
                <label className=" w-full">
                  <FormLabel> Description :</FormLabel>
                  <textarea
                    onChange={handleChange}
                    value={formData.descriotion_en}
                    name="descriotion_en"
                    className="  p-2 rounded-lg h-28  w-full transition-all focus:outline-blue-500 duration-200 border-2"
                    type="text"
                  />
                </label>
              </div>
              <div style={{ direction: "rtl" }} className="w-full space-y-2">
                <FormControl isInvalid={validation.name_ar} >
                  <FormLabel> الاسم :</FormLabel>
                  <Input
                    type="text"
                    name="name_ar"
                    value={formData.name_ar}
                    onChange={handleChange}
                  />
                  <FormErrorMessage>Name is required</FormErrorMessage>

                </FormControl>
                <FormControl>
                  <FormLabel> العنوان : </FormLabel>
                  <Input
                    type="text"
                    name="address_ar"
                    value={formData.address_ar}
                    onChange={handleChange}
                  />
                </FormControl>
                <label className=" w-full">
                  <FormLabel> الوصف :</FormLabel>
                  <textarea
                    name="descriotion_ar"
                    onChange={handleChange}
                    value={formData.descriotion_ar}
                    className=" p-2 rounded-lg h-28 w-full border-2 transition-all focus:outline-blue-500 duration-200"
                    type="text"
                    size={"lg"}
                  />
                </label>
                <FormControl>
                <FormLabel>Image</FormLabel>
                {/* <Upload
                  // {...props}
                  showUploadList={true}
                  customRequest={(info)=>handleSubmit(info)}
                  multiple={true}
                  style={{ backgroundColor: 'red' }}
                >
                  <Button>
                    <UploadIcon className='h-6 me-3' /> Upload
                  </Button>
                </Upload> */}
                <input type="file" multiple onChange={(event)=>setSelectedFile(event.target.files)} name="" id="" />
              </FormControl>
              </div>
            </div>
            <Button colorScheme="teal" width="100%" type="submit" isLoading={loading} mt={4}>
              Submit
            </Button>
          </form>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default FormCompound;
