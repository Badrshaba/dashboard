import { Carousel } from 'antd';
import { useParams } from 'react-router-dom';

const ProperitePage = () => {
  const { properiteId } = useParams();

  return (
    <>
      <Carousel
        arrows
        infinite={true}
      >
        <div>
          <img
            src='/sample1.jpg'
            alt=''
            className='h-96 w-full'
          />
        </div>
        <div>
          <img
            src='/sample2.jpg'
            alt=''
            className='h-96 w-full'
          />
        </div>
      </Carousel>
      <div className='mt-5 px-8'></div>
    </>
  );
};

export default ProperitePage;
