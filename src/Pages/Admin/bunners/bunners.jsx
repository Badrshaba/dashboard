import { useEffect } from 'react';
import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getBunnersAsync } from '../../../redux/thunck/bunnersAsync';
import AddBunnerPopup from './addBunnerPopup';
import { BunnerCard } from '../../../componants';

const Bunners = () => {
  const { bunners, isLoading, error } = useSelector((state) => state.bunners);
  const { authButton } = useSelector((state) => state.authrization);
  console.log(bunners);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBunnersAsync());
  }, []);
  return (
    <div className='bunners-page bg-white p-3 rounded-md '>
      <h3 className='text-3xl'>Banners</h3>
      {authButton&&   <AddBunnerPopup
        error={error}
        isLoading={isLoading}
      />}
   
      {isLoading ? (
        <Box
          mt={5}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Spinner />
        </Box>
      ) : (
        <SimpleGrid
          columns={4}
          gap={10}
          mt={8}
        >
          {bunners?.map((banner) => (
            <BunnerCard
              banner={banner}
              loading={isLoading}
              key={banner.id}
            />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default Bunners;
