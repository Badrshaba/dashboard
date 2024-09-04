import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure, Button, Input, Text } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { getCompounds } from '../../redux';
import FormCompound from './FormCompound';
import useSearch from '../../hooks/useSearch';
import TestTable from './TestTable';
import { updatecompoundsList } from '../../redux/slices/compounds';
const Compounds = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    descriotion_en: '',
    descriotion_ar: '',
    area_max: '',
    area_min: '',
    address_ar: '',
    address_en: '',
    price_min: '',
    price_max: '',
    zone_id: '',
  });
  const [searchHandel, search, setSearch] = useSearch('/search-compound',updatecompoundsList);
  const { compounds, isLoading, error } = useSelector((state) => state.compounds);
  const dispatch = useDispatch();
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
    <div className='bg-white p-3 rounded-md '>
      <h3 className='text-3xl'>Compounds</h3>
      <div className=' flex justify-between items-center'>
        <Button
          colorScheme='teal'
          leftIcon={<Plus />}
          mt={5}
          size='md'
          onClick={onOpen}
        >
          Add Compounds
        </Button>
   
      </div>
      <FormCompound
        onClose={onClose}
        handleChange={handleChange}
        isOpen={isOpen}
        formData={formData}
      />
      {!!compounds.length&&<TestTable compounds={compounds} />}
      
    </div>
  );
};

export default Compounds;
