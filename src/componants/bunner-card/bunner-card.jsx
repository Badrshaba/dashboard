import { Box, Button } from '@chakra-ui/react';
import { Image } from 'antd';
import { Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteBannerFromDashboard } from '../../redux/thunck/bunnersAsync';

const BunnerCard = ({ image, loading }) => {
  const dispatch = useDispatch();

  return (
    <Box
      bg='gray.200'
      border='1px solid gray'
      rounded={true}
      className=' h-fit'
    >
      <Image
        src={image.image}
        style={{ margin: '0' }}
      />
      <Button
        colorScheme='red'
        width='100%'
        rounded={false}
        onClick={() => dispatch(deleteBannerFromDashboard(image?.id))}
      >
        <Trash />
      </Button>
    </Box>
  );
};

export default BunnerCard;
