import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';
import { Button, Input, useDisclosure } from '@chakra-ui/react';
import TableProperites from './TableProperites';
import { getProperites } from '../../../redux/thunck/crudProperites';
import useSearch from '../../../hooks/useSearch';
import { setProperites } from '../../../redux/slices/properites';
import { Link } from 'react-router-dom';
import paths from '../../../route/paths';
const Properites = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { properites, isLoading, error } = useSelector((state) => state.properites);
  const dispatch = useDispatch();
  const [searchHandel, search, setSearch] = useSearch('apartments/search', setProperites);
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    address_ar: '',
    address_en: '',
    area: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    delivery_in: '',
    longitude: '',
    balconies: '',
    grage: '',
    zone_id: '1',
    user_id: '1',
    compound_id: '1',
    sub_id: '1',
    status_id: '1',
    type_id: '1',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    dispatch(getProperites());
  }, []);

  return (
    <div className=' bg-white p-5 rounded-md mt-5 '>
      <h3 className='text-3xl'>Properites</h3>
      <div className=' flex justify-between'>
        <Link to={paths.addproperity}>
          <Button
            colorScheme='teal'
            leftIcon={<Plus />}
            mt={5}
            size='md'
          >
            Add Properites
          </Button>
        </Link>
        <form
          action=''
          className=' flex items-center space-x-2'
          onSubmit={searchHandel}
        >
          <Input
            type='text'
            name='area_en'
            placeholder='Search'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button> Search </button>
        </form>
      </div>

      <TableProperites properites={properites} />
    </div>
  );
};

export default Properites;
