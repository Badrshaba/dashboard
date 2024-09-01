import { useEffect } from 'react';
import { Box, Grid, GridItem, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getBunnersAsync } from '../../redux/thunck/bunnersAsync';
import AddBunnerPopup from './addBunnerPopup';
import BunnerCard from '../../componants/bunner-card/bunner-card';

const Bunners = () => {
  const { bunners, isLoading, error } = useSelector((state) => state.bunners);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBunnersAsync());
  }, []);
  return (
    <div className='bunners-page bg-white p-3 rounded-md '>
      <h3 className='text-3xl'>Banners</h3>
      <AddBunnerPopup
        error={error}
        isLoading={isLoading}
      />
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
          {bunners?.map((image) => (
            <BunnerCard
              image={image}
              loading={isLoading}
              key={image.id}
              
            />
          ))}
        </SimpleGrid>
      )}
      {/* <Pagination
        current={1}
        defaultCurrent={1}
        total={50}
        pageSize={10}
        align='center'
        showTotal={() => (
          <Text
            fontWeight={500}
            color='teal'
            fontSize='1rem'
          >
            Total Bunners: 10
          </Text>
        )}
        onChange={() => {
          setPageNumber((prev) => prev + 1);
        }}
      /> */}
    </div>
  );
};

export default Bunners;
