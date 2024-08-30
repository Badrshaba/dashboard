import { Box, Spinner } from '@chakra-ui/react';

const LoadingSkeleton = () => {
  return (
    <Box
      alignItems='center'
      justifyContent='center'
      display='flex'
      h='100vh'
    >
      <Spinner />
    </Box>
  );
};

export default LoadingSkeleton;
