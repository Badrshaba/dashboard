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
} from "@chakra-ui/react";
import { useState } from "react";
import { baseURL } from "../../utils/api";
const FormCompound = ({ onClose, isOpen, formData, handleChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
 const [loading,setLoading] =  useState(false)
 const [error,setError] =  useState(null)
 const getuserData = async (userId) => {
  try {
    onOpen();
    const { data } = await getUsersApi.get('/profile-cc', {
      params: { id: userId },
    });
    usernameRef.current.value = data?.data?.name;
    roleRef.current.value = data?.data?.role;
    setUserInfo(data?.data);
  } catch (error) {
    console.log(error);
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true)
    const formDataSend = new FormData();
    formDataSend.append("name_ar", formData.name_ar);
    formDataSend.append("name_en", formData.name_en);
    formDataSend.append("description_en", formData.descriotion_ar);
    formDataSend.append("description_ar", formData.descriotion_en);
    formDataSend.append("area_min", formData.area_min);
    formDataSend.append("area_max", formData.area_max);
    formDataSend.append("address_ar", formData.address_ar);
    formDataSend.append("address_en", formData.address_en);
    formDataSend.append("price_min", formData.price_min);
    formDataSend.append("price_max", formData.price_max);
    formDataSend.append("zone_id",formData.zone_id );
    formDataSend.append("user_id", '1');
    formDataSend.append("image", selectedFile);
    try {
      let { data } = await baseURL({
        method: "post",
        url: "/compounds",
        data: formDataSend,
        headers: {
          "Content-Type": "multipart/form-data",
          APP_KEY: import.meta.env.VITE_APP_KEY,
        },
      });
      console.log(data);
      setLoading(false)
      setTimeout(()=>{
        onClose()
      },500)
    } catch (error) {
      setError(error?.response?.data || error?.message);
      setLoading(false)
    }
  };
console.log(error?.data);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Compounds</ModalHeader>
        <ModalCloseButton />
        {error && (
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>{error?.data[0]}</AlertTitle>
      </Alert>
    )}
        <VStack spacing={4}>
          <form className="p-5 w-full" onSubmit={handleSubmit}>
            <div className=" flex space-x-3 w-full">
              <div className="w-full space-y-2">
                <FormControl>
                  <FormLabel>Name :</FormLabel>
                  <Input
                    colorScheme={"red"}
                    name="name_en"
                    type="text"
                    value={formData.name_en}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>image :</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>choose image</InputLeftAddon>
                    <Input
                      type="file"
                      name="image"
                      value={formData.image}
                      onChange={(event) =>
                        setSelectedFile(event.target.files[0])
                      }
                    ></Input>
                  </InputGroup>
                </FormControl>
                <FormControl>
                <FormLabel>Zone :</FormLabel>
                <Select name="zone_id" onChange={handleChange}>
                  <option value='1'>1</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Area Min :</FormLabel>
                  <Input
                    type="text"
                    name="area_min"
                    value={formData.area_min}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
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
                {/* <FormControl>
                  <FormLabel className="focus-visible:border-black">
                    Location Link :
                  </FormLabel>
                  <Input
                    type="text"
                    name="location_link"
                    value={formData.location_link}
                    onChange={handleChange}
                  />
                </FormControl> */}
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
                <FormControl>
                  <FormLabel> الاسم :</FormLabel>
                  <Input
                    type="text"
                    name="name_ar"
                    value={formData.name_ar}
                    onChange={handleChange}
                  />
                </FormControl>
                {/* <FormControl>
                  <FormLabel> المنطقة :</FormLabel>
                  <Input
                    type="text"
                    name="area_ar"
                    value={formData.area_ar}
                    onChange={handleChange}
                  />
                </FormControl> */}
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
