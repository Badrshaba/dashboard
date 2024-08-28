import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { getCompounds } from "../../redux/thunck/crudCompounds";
import FormCompound from "./FormCompound";
import TableCompound from "./TableCompound";
const Compounds = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  // const [searchHandel,search,setSearch] = useSearch('')
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
      <Button
        colorScheme="teal"
        leftIcon={<Plus />}
        mt={5}
        size="md"
        onClick={onOpen}
      >
        Add Compounds
      </Button>
<FormCompound onClose={onClose} handleChange={handleChange} isOpen={isOpen} formData={formData}   />
      <TableCompound
        headings={tableHeading}
        data={compounds}
      />

    </div>
  );
  // return <TableComp title='Compounds' />;
};

export default Compounds;
