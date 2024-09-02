import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubCategories } from '../../redux/thunck/subCategoriesAsync';
import LoadingSkeleton from '../../componants/loading-skeleton/LoadingSkeleton';
import SubCategoryCard from '../../componants/sub-category-card/SubCategoryCard';
import { SimpleGrid } from '@chakra-ui/react';
import AddSubCategoryPopup from './addSubCategoryPopup';
import { notification } from 'antd';
const SubCategories = () => {
  const { subCategories, isLoading, error } = useSelector((state) => state.subCategories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSubCategories());
  }, []);
  return (
    <div className='users-page bg-white p-3 rounded-md'>
      <h3 className='text-3xl'>Sub Categories</h3>
      <AddSubCategoryPopup
        error={error}
        isLoading={isLoading}
      />
      {isLoading && <LoadingSkeleton />}

      {subCategories && (
        <SimpleGrid
          mt={8}
          columns={3}
          gap={5}
        >
          {subCategories.map((subCate) => (
            <SubCategoryCard
              key={subCate.id}
              subCate={subCate}
            />
          ))}
        </SimpleGrid>
      )}
    </div>
  );
};

export default SubCategories;
