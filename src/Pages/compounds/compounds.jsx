import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import TableComp from "../../componants/table-comp/table-comp";
import axios from "axios";
import { getCompounds } from "../../redux/thunck/crudCompounds";
const Compounds = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [border, setBorder] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    descriotion_en: "",
    descriotion_ar: "",
    area_en: "",
    area_ar: "",
    location_ar: "",
    location_en: "",
    location_link: "",
    start_price: "",
    max_price: "",
  });
  const { compounds, isLoading, error } = useSelector((state) => state.compounds);
  const dispatch = useDispatch();

  const tableHeading = ["id", "area", "location", "max price",'start price'];

  useEffect(() => {
    dispatch(getCompounds());
  }, []);

  console.log(compounds);

  // const [searchHandel,search,setSearch] = useSearch('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataSend = new FormData();
    formDataSend.append("name_ar", formData.name_ar);
    formDataSend.append("name_en", formData.name_en);
    formDataSend.append("descriotion_ar", formData.descriotion_ar);
    formDataSend.append("descriotion_en", formData.descriotion_en);
    formDataSend.append("area_en", formData.area_en);
    formDataSend.append("area_ar", formData.area_ar);
    formDataSend.append("location_ar", formData.location_ar);
    formDataSend.append("location_en", formData.location_en);
    formDataSend.append("max_price", formData.max_price);
    formDataSend.append("start_price", formData.start_price);
    formDataSend.append("location_link", formData.location_link);
    formDataSend.append("image", selectedFile);
    try {
      let {data} =  await axios({
        method: "post",
        url: "https://ai.w-manage.org/api/compounds",
        data: formDataSend,
        headers: {
          "Content-Type": "multipart/form-data",
          APP_KEY: import.meta.env.VITE_APP_KEY,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    
  };
  return (
    <div className="users-page bg-white p-5 rounded-md mt-5">
      <h3 className="text-3xl">Compounds</h3>
      <Button
        colorScheme="teal"
        leftIcon={<Plus />}
        mt={5}
        size="md"
        onClick={onOpen}
      >
        Add Compounds
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"5xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Compounds</ModalHeader>
          <ModalCloseButton />
          {/* {error && (
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{error.message}</AlertTitle>
          </Alert>
        )} */}
          <VStack spacing={4}>
            <form className="p-5 w-full" onSubmit={handleSubmit}>
              <div className=" flex space-x-3 w-full">
                <div className="w-full">
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
                        onChange={(event)=>setSelectedFile(event.target.files[0])}
                      ></Input>
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Area :</FormLabel>
                    <Input
                      type="text"
                      name="area_en"
                      value={formData.area_en}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Location :</FormLabel>
                    <Input
                      type="text"
                      name="location_en"
                      value={formData.location_en}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel className="focus-visible:border-black">
                      Location Link :
                    </FormLabel>
                    <Input
                      type="text"
                      name="location_link"
                      value={formData.location_link}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel className="focus-visible:border-black">
                      Start Price :
                    </FormLabel>
                    <Input
                      type="number"
                      name="start_price"
                      value={formData.start_price}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel className="focus-visible:border-black">
                      Max Price :
                    </FormLabel>
                    <Input
                      type="number"
                      name="max_price"
                      value={formData.max_price}
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
                <div style={{ direction: "rtl" }} className="w-full">
                  <FormControl>
                    <FormLabel> الاسم :</FormLabel>
                    <Input
                      type="text"
                      name="name_ar"
                      value={formData.name_ar}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel> المنطقة :</FormLabel>
                    <Input
                      type="text"
                      name="area_ar"
                      value={formData.area_ar}
                      onChange={handleChange}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel> الموقع : </FormLabel>
                    <Input
                      type="text"
                      name="location_ar"
                      value={formData.location_ar}
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
              <Button
                colorScheme="teal"
                width="100%"
                type="submit"
                onClick={(e) => handleSubmit(e, { name: "amr" })}
                mt={4}
              >
                Submit
              </Button>
            </form>
          </VStack>
        </ModalContent>
      </Modal>
      <TableComp
        headings={tableHeading}
        data={compounds}
      />

    </div>
  );
  // return <TableComp title='Compounds' />;
};

export default Compounds;
