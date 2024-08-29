import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
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
    <div className='bunners-page bg-white p-5 rounded-md mt-5'>
      <h3 className='text-3xl'>Bunners</h3>
      <AddBunnerPopup
        error={error}
        isLoading={isLoading}
      />
      <Flex
        gap={5}
        mt={5}
      >
        {bunners?.map((image) => (
          <BunnerCard
            image={image}
            key={image.id}
          />
        ))}
      </Flex>
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
