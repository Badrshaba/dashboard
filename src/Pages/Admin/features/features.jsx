import { useDispatch, useSelector } from 'react-redux';
import AddFeatures from './AddFeatures';
import TableFeature from './TableFeatures';
import { useEffect } from 'react';
import { getFeatures } from '../../../redux/thunck/crudFeatures';


const Features = () => {
  const { features, isLoading, error } = useSelector((state) => state.features);
  const { properites  } = useSelector((state) => state.properites);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getFeatures());
  }, []);

  return (
    <div className='bg-white p-3 rounded-md'>
      <h3 className='text-3xl'>Features</h3>
      <div className=' flex justify-between items-center'>
        <AddFeatures properites={properites} />
      </div>
      <TableFeature features={features} />
    </div>
  );
};

export default Features;
