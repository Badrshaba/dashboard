import { Box, Button } from '@chakra-ui/react';
import { Image } from 'antd';
import { Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteBannerFromDashboard } from '../../redux/thunck/bunnersAsync';

const BunnerCard = ({ banner, loading }) => {
  const dispatch = useDispatch();

  return (
    <Box
      bg='gray.200'
      border='1px solid gray'
      rounded={true}
      className=' h-fit'
    >
      <Image
        src={banner.image}
        style={{ margin: '0' }}
      />
      <Button
        colorScheme='red'
        width='100%'
        rounded={false}
        isLoading={loading}
        onClick={() => dispatch(deleteBannerFromDashboard(banner?.id))}
      >
        <Trash />
      </Button>
    </Box>
  );
};

export default BunnerCard;
