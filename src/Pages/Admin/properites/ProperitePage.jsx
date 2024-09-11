import { Carousel, Typography } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProperites } from '../../../redux/thunck/crudProperites';

const ProperitePage = () => {
  const { properites } = useSelector((state) => state.properites);
  const [properite] = properites;
  console.log(properite);
  const { properiteId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProperites());
  }, []);
  return (
    <>
      <Carousel
        arrows
        infinite={true}
        autoplay={true}
        draggable={true}
      >
        <div>
          <img
            src='/sample1.jpg'
            alt=''
            className='h- wfull-full'
          />
        </div>
        <div>
          <img
            src='/sample2.jpg'
            alt=''
            className='h-full w-full'
          />
        </div>
      </Carousel>

      <div className='mt-5 px-8'>
        <Typography>
          <Typography.Text>{properite?.compound?.name}</Typography.Text>
        </Typography>
        <Typography>
          <Typography.Title>{properite?.title}</Typography.Title>
        </Typography>
      </div>
    </>
  );
};

export default ProperitePage;
