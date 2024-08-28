import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDisclosure,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { getCompounds } from "../../redux/thunck/crudCompounds";
import FormCompound from "./FormCompound";
import TableCompound from "./TableCompound";
import { Pagination } from "antd";
import useSearch from "../../hooks/useSearch";
const Compounds = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pageNumber, setPageNumber] = useState(1);
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
  const [searchHandel,search,setSearch] = useSearch('')
  const { compounds, isLoading, error } = useSelector((state) => state.compounds);
  const dispatch = useDispatch();
  const tableHeading = ["id","name", "area", "location", "max price",'start price'];
  useEffect(() => {
    dispatch(getCompounds());
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="users-page bg-white p-5 rounded-md mt-5">
      <h3 className="text-3xl">Compounds</h3>
      <div className=" flex justify-between items-center" >

      <Button
        colorScheme="teal"
        leftIcon={<Plus />}
        mt={5}
        size="md"
        onClick={onOpen}
      >
        Add Compounds
      </Button>
<form action="" className=" flex items-center space-x-2" onSubmit={searchHandel} >
          <Input
            type="text"
            name="area_en"
            placeholder="Search"
            value={search}
            onChange={(event)=>setSearch(event.target.value)}
          />
          <Button> Search </Button>
        </form>
      </div>
<FormCompound onClose={onClose} handleChange={handleChange} isOpen={isOpen} formData={formData}   />
      <TableCompound
        headings={tableHeading}
        data={compounds}
      />
<Pagination
        defaultCurrent={1}
        total={6}
        align='center'
        showTotal={() => (
          <Text
            fontWeight={500}
            color='teal'
            fontSize='1rem'
          >
            Total Compounds: 
          </Text>
        )}
        onChange={() => {
          setPageNumber((prev) => (pageNumber === users?.last_page ? pageNumber : prev + 1));
          dispatch(getUsersAsync(pageNumber));
        }}
      />
    </div>
  );
};

export default Compounds;
