import { Box, Textarea } from '@chakra-ui/react';

const DescriptionAndTags = () => {
  return (
    <Box px={5}>
      <h3 className='mb-3 text-xl fw-semibold text-[#4D5454]'>7.Description And Tags</h3>
      <Textarea
        resize='none'
        placeholder='Description'
        width={650}
        height={150}
      />
    </Box>
  );
};

export default DescriptionAndTags;
