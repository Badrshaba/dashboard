import { Box, Button } from '@chakra-ui/react';
import { Image } from 'antd';
import { Trash } from 'lucide-react';

const BunnerCard = ({ image }) => {
  return (
    <Box
      bg='gray.200'
      p={1}
      rounded={5}
    >
      <Image src={image.image} />
      <Button
        colorScheme='red'
        mt={1}
        style={{ display: 'flex', justifyContent: 'center' }}
        width={'100%'}
      >
        <Trash />
      </Button>
    </Box>
  );
};

export default BunnerCard;
