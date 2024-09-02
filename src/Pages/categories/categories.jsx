import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SimpleGrid } from '@chakra-ui/react';
import { getAllCategories } from '../../redux/thunck/crudCategories';
import CategoryCard from '../../componants/category-card/CategoryCard';
import LoadingSkeleton from '../../componants/loading-skeleton/LoadingSkeleton';
import AddCategoryPopup from './addCategoryPopup';

const Categories = () => {
  const { categories, isLoading, error } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <div className='bg-white p-3 rounded-md'>
      <h3 className='text-3xl'>Categories</h3>
      <AddCategoryPopup
        isLoading={isLoading}
        error={error}
      />
      {isLoading && <LoadingSkeleton />}
      <SimpleGrid
        columns={3}
        gap={5}
        mt={5}
      >
        {categories?.map((cate) => (
          <CategoryCard
            error={error}
            isLoading={isLoading}
            cate={cate}
            key={cate.id}
          />
        ))}
      </SimpleGrid>
    </div>
  );
};

export default Categories;
