import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Carousel, Collapse, notification, Typography } from 'antd';
import { NumericFormat } from 'react-number-format';
import { Box, Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import { getProperityById } from '../../../../redux/thunck/crudProperites';
import { baseURL, getUsersApi } from '../../../../utils/api';
import Tools from './Tools';
import { getCompoundById } from '../../../../redux/thunck/crudCompounds';
import jsPDF from 'jspdf';
import { ArrowBigDownDash, Eye } from 'lucide-react';
import Script from '../../properites/properitesDeitals/Script';


const CompoundPage = () => {
  const { compoundId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure()
const [error,setError] = useState(false)
 const {compound} = useSelector((state) => state.compounds)
 const [images, setImages] = useState([])
 const [loading, setLoading] = useState(false)
const dispatch = useDispatch();
useEffect(()=>{
  dispatch(getCompoundById(compoundId))
  },[])
  const onSubmit = async(e)=>{
    e.preventDefault();
    if (images.length==0) return setError(true)
    try {
      let { data } = await baseURL({
        method: 'post',
        url: `/compounds/${compoundId}?_method=PUT`,
        data: {
          script:images
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          APP_KEY: import.meta.env.VITE_APP_KEY,
          Authorization: `Bearer ${localStorage.getItem('userToken')}`.replaceAll('"', ''),
        },
      });
      notification.success({
        description: 'Successfully updated Script.!',
        duration: 2,
        showProgress: true,
        message: 'Update Script',
        placement: 'topRight',
      });
      setLoading(false)
      onClose()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  return (
    <Box pb={10}>
      <Carousel
        arrows
        infinite={true}
        autoplay={true}
        draggable={true}
      >
        <div>
          <img
            src={compound?.image}
            alt=''
            style={{ height: '450px', width: '100%' }}
          />
        </div>
      </Carousel>
      
      <Box
        px={8}
        mt={5}
      >
        <Flex justifyContent='space-between'>
          <Box>
            <Typography.Title>{compound?.name_en}</Typography.Title>
            <Typography.Text >
            Description:{' '}
            <Typography.Paragraph style={{ maxWidth: '40rem', color: '#5c5b5b' }}>
              {compound?.description}
            </Typography.Paragraph>
            </Typography.Text>
          </Box>

          <Stack>
            <Typography.Text
              style={{
                backgroundColor: '#6b6b6b',
                padding: '7px 12px',
                borderRadius: '1rem',
                color: 'white',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                fontSize: '12px',
                display: 'block',
              }}
            >
              <NumericFormat
                 value={compound?.price_from}
                displayType='text'
                thousandSeparator=','
              />{' '}
              To{' '}
              <NumericFormat
                 value={compound?.price_to}
                displayType='text'
                thousandSeparator=','
              />
            </Typography.Text>
              <Typography.Text style={{ fontWeight: 'bold' }}>
                Units:{' '}
                <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                  {compound?.number_of_units}
                </Typography.Text>
              </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Zone:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {compound?.zone?.name}
              </Typography.Text>
            </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Address:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {compound?.address_en}
              </Typography.Text>
            </Typography.Text>
            <Typography.Text style={{ fontWeight: 'bold' }}>
              Area:{' '}
              <Typography.Text style={{ fontWeight: 'bold', color: 'teal' }}>
                {compound?.area}
              </Typography.Text>
            </Typography.Text>
          
          </Stack>
        </Flex>
      </Box>
      {/* <div className='flex justify-end gap-5 my-3 mr-3' >
      <a href={compound?.script} target='_blank'> <Button colorScheme='blue' >view</Button></a>
     <Button colorScheme='red' onClick={generatePDF} >download</Button>
      </div> */}
   <Script data={compound} loading={loading} onSubmit={onSubmit} setError={setError} error={error} images={images} setImages={setImages} isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
     <Tools floorplancompound={compound?.floorplancompound} masterplancompound={compound?.masterplancompound}  modelcompound={compound?.modelcompound} imagecompound={compound?.imagecompound} paymentplancompound={compound?.paymentplancompound}/>
    </Box>
  );
};

export default CompoundPage;
