import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDisclosure, Button, Input, Text } from '@chakra-ui/react';
import { Plus } from 'lucide-react';
import { getCompounds } from '../../../redux';
import FormCompound from './FormCompound';
import useSearch from '../../../hooks/useSearch';
import { updatecompoundsList } from '../../../redux/slices/compounds';
import CompoundsTable from './CompoundsTable';
import useGetZone from '../../../hooks/useGetZone';
const Compounds = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    area: '',
    address_ar: '',
    address_en: '',
    price_from: '',
    price_to: '',
    zone_id: '',
  });
  const [errors,setErrors] = useState({
    name_en: '',
    name_ar: '',
    description_en: '',
    description_ar: '',
    area: '',
    address_ar: '',
    address_en: '',
    price_from: '',
    price_to: '',
    zone_id: '',
  })
  const Files = useState([]);
  const File = useState([]);
 // const [searchHandel, search, setSearch] = useSearch('/search-compound', updatecompoundsList);
  const { compounds, isLoading, error } = useSelector((state) => state.compounds);

  const [getZone, zones] = useGetZone();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompounds());
  }, []);
  const clearInput = () =>{
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        setFormData((prevData) => ({
          ...prevData,
          [key]: '',
        }))
      }
    }
    for (let key in errors) {
      if (errors.hasOwnProperty(key)) {
        setErrors((prevData) => ({
          ...prevData,
          [key]: '',
        }))
      }
    }
    Files[1]([])
    File[1]([])
    getZone()
    onOpen()
  }

  return (
    <div className='bg-white p-3 rounded-md '>
      <h3 className='text-3xl'>Compounds</h3>
      <div className=' flex justify-between items-center'>
        <Button
          colorScheme='teal'
          leftIcon={<Plus />}
          mt={5}
          size='md'
          onClick={clearInput}
        >
          Add Compounds
        </Button>
      </div>
      <FormCompound
        onClose={onClose}
        isOpen={isOpen}
        formData={formData}
        zones={zones}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        Files={Files}
        File={File}
      />
      <CompoundsTable compounds={compounds} />
    </div>
  );
};

export default Compounds;
